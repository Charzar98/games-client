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
  KEYBOARD_LETTERS,
  WordleFormGroup
} from '../wordle-types';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { WordleRowDirective } from '../wordle-row.directive';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-wordle',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatSnackBarModule, WordleRowDirective],
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.scss'],
  animations: [
    trigger('elementEnter', [
      transition(':enter', [style({ opacity: 0 }), animate(2000, style({ opacity: 1 }))]),]),
    trigger('guessLetterAnimation', [
      state('absent', style({ backgroundColor: '#3a3a3c' })),
      state('present', style({ backgroundColor: '#b59f3b' })),
      state('correct', style({ backgroundColor: '#538d4e' })),
      transition('* => *', animate(1000, style({ transform: 'rotate(1turn)' })))
    ])]
})
export class WordleComponent {
  public wordleFormGroup!: FormGroup<WordleFormGroup>;
  public letterCount: FormControl<number> = getLetterCountFormControl();

  protected readonly keyboardLetters: string[][] = KEYBOARD_LETTERS;

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

  public clearInputs() {
    this.wordleFormGroup.controls.guessedLetters.reset();
  }

  public navigateToDictionaryLink() {
    window.open(`https://www.merriam-webster.com/dictionary/${this.wordleFormGroup.controls.wordToGuess.value}`, '_blank');
  }

  public animationTrigger(letter: string, guessedLetters: FormGroup<GuessedLetterFormControl>[]) {
    return guessedLetters.find(x => x.controls.letterValue.value?.toLowerCase() === letter.toLowerCase())?.controls.letterState.value;
  }

  private decrementGuesses() {
    this.wordleFormGroup.controls.numberOfGuesses.patchValue(this.wordleFormGroup.controls.numberOfGuesses.value - 1);
  }
}
