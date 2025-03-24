import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalRequestsService } from '../../../services/external-requests/external-requests.service';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  getLetterCountFormControl,
  getWordleFormGroup,
  GuessedLetterFormControl,
  LetterState,
  WordleFormGroup
} from '../wordle-types';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { WordleRowDirective } from '../wordle-row.directive';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-wordle',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatSnackBarModule, WordleRowDirective],
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.scss'],
  animations: [trigger('guessLetterAnimation', [
    transition(':enter', [style({ opacity: 0 }), animate(1250, style({ opacity: 1 }))]),
    transition('* => absent', animate(1000, style({ backgroundColor: '#3a3a3c', transform: 'rotate(1turn)' }))),
    transition('* => present', animate(1000, style({ backgroundColor: '#b59f3b', transform: 'rotate(1turn)' }))),
    transition('* => success', animate(1000, style({ backgroundColor: '#538d4e', transform: 'rotate(1turn)' })))
  ])]
})
export class WordleComponent {
  public wordleFormGroup!: FormGroup<WordleFormGroup>;
  public letterCount: FormControl<number> = getLetterCountFormControl();

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
    this.decrementGuesses();

    if (this.wordleFormGroup.controls.numberOfGuesses.invalid) {
      this.wordleFormGroup.controls.guessedLetters.disable();
      return;
    }

    for (let i = 0; i < this.wordleFormGroup.controls.trueLetters.controls.length; i++) {
      const trueLetter = this.wordleFormGroup.controls.trueLetters.controls[i];
      const guessedLetter = this.wordleFormGroup.controls.guessedLetters.controls[i];

      switch (true) {
        case guessedLetter.controls.letterValue.value === trueLetter.value:
          guessedLetter.controls.letterState.patchValue('correct');
          break;
        case this.wordleFormGroup.controls.trueLetters.controls.some(x => x.value === guessedLetter?.controls.letterValue.value):
          guessedLetter.controls.letterState.patchValue('present');
          break;
        default:
          guessedLetter.controls.letterState.patchValue('absent');
          break;
      }
    }
  }

  public validateInput(letter: FormGroup<GuessedLetterFormControl>) {
    if (letter.invalid) {
      letter.reset();
    }
  }

  private decrementGuesses() {
    this.wordleFormGroup.controls.numberOfGuesses.patchValue(this.wordleFormGroup.controls.numberOfGuesses.value - 1);
  }

  public clearInputs(inputClearMode: LetterState) {
    this.wordleFormGroup.controls.guessedLetters.controls.forEach(letter => {
      if (inputClearMode === 'present' && letter.controls.letterState.value === 'absent') {
        letter.reset();
      } else if (inputClearMode === 'correct' && (letter.controls.letterState.value === 'absent' || letter.controls.letterState.value === 'present')) {
        letter.reset();
      } else {
        letter.reset();
      }
    });
  }

  public navigateToDictionaryLink() {
    window.open(`https://www.merriam-webster.com/dictionary/${this.wordleFormGroup.controls.wordToGuess.value}`, '_blank');
  }
}
