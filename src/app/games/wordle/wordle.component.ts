import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalRequestsServiceService } from '../../services/external-requests-service.service';
import { firstValueFrom } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { getLetterCountFormControl, getWordleFormGroup, WordleFormGroup } from '../../types/wordle-types';

@Component({
  selector: 'app-wordle',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.scss']
})
export class WordleComponent {
  public wordleFormGroup!: FormGroup<WordleFormGroup>;
  public letterCount: FormControl<number> = getLetterCountFormControl();

  private readonly externalServices: ExternalRequestsServiceService = inject(ExternalRequestsServiceService);

  public async getRandomWord(letterCount: number) {
    await firstValueFrom(this.externalServices.getRandomWord(letterCount)).then(word => {
      this.wordleFormGroup = getWordleFormGroup(word);
    });
    console.log(this.wordleFormGroup.controls.guessedLetters.errors);
  }

  public guessWord() {
    for (let i = 0; i < this.wordleFormGroup.controls.trueLetters.controls.length; i++) {
      console.log(this.wordleFormGroup.controls.trueLetters.at(i).value === this.wordleFormGroup.controls.guessedLetters.at(i).value)
    }
  }

  public clear() {
    this.wordleFormGroup.controls.guessedLetters.controls.forEach(letter => letter.reset());
  }


  // TODO find out what this means: gantlets
}
