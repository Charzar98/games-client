import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalRequestsService } from '../../services/external-requests.service';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  getLetterCountFormControl,
  getWordleFormGroup,
  GuessedLetterFormControl,
  LetterState,
  WordleFormGroup
} from '../../types/wordle-types';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { WordleRowDirective } from './wordle-row.directive';

@Component({
  selector: 'app-wordle',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatSnackBarModule, WordleRowDirective],
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.scss']
})
export class WordleComponent {
  public wordleFormGroup!: FormGroup<WordleFormGroup>;
  public letterCount: FormControl<number> = getLetterCountFormControl();

  protected readonly LetterState: typeof LetterState = LetterState;

  private readonly snackBar: MatSnackBar = inject(MatSnackBar);
  private readonly externalServices: ExternalRequestsService = inject(ExternalRequestsService);

  public async getRandomWord(letterCount: number) {
    await this.externalServices.getRandomWord(letterCount).then(word => {
      this.wordleFormGroup = getWordleFormGroup(word);
    }).catch(_ => {
      this.snackBar.open('Error Fetching Word', undefined, { duration: 5000 });
    });
  }

  public guessWord() {
    if (this.wordleFormGroup.controls.guessedLetters.invalid) return;

    this.wordleFormGroup.controls.numberOfGuesses.patchValue(this.wordleFormGroup.controls.numberOfGuesses.value - 1);

    for (let i = 0; i < this.wordleFormGroup.controls.trueLetters.controls.length; i++) {
      const trueLetter = this.wordleFormGroup.controls.trueLetters.controls[i];
      const guessedLetter = this.wordleFormGroup.controls.guessedLetters.controls[i];

      switch (true) {
        case guessedLetter.controls.letterValue.value === trueLetter.value:
          guessedLetter.controls.letterState.patchValue(LetterState.Correct);
          break;
        case this.wordleFormGroup.controls.trueLetters.controls.some(x => x.value === guessedLetter?.controls.letterValue.value):
          guessedLetter.controls.letterState.patchValue(LetterState.Present);
          break;
        default:
          guessedLetter.controls.letterState.patchValue(LetterState.Absent);
          break;
      }
    }
  }

  public validateInput(letter: FormGroup<GuessedLetterFormControl>) {
    if (letter.invalid) {
      letter.reset();
    }
  }

  public clearInputs() {
    this.wordleFormGroup.controls.guessedLetters.controls.forEach(letter => letter.reset());
  }

  public navigateToDictionaryLink() {
    window.open(`https://www.merriam-webster.com/dictionary/${this.wordleFormGroup.controls.wordToGuess.value}`, '_blank');
  }
}
