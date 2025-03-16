import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalRequestsService } from '../../services/external-requests.service';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { getLetterCountFormControl, getWordleFormGroup, LetterState, WordleFormGroup } from '../../types/wordle-types';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wordle',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.scss']
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
      this.snackBar.open('Error Fetching Word', _, { duration: 5000 });
    });
  }

  public guessWord() {
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

  public clearInputs() {
    this.wordleFormGroup.controls.guessedLetters.controls.forEach(letter => letter.reset());
  }

  protected readonly onkeyup = onkeyup;
}
