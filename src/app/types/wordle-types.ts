import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

export interface WordleFormGroup {
  // Individual letters obtained from the random word
  trueLetters: FormArray<FormControl<string>>;
  // Individual letters from the word the user has guessed
  guessedLetters: FormArray<FormControl<string | null>>;
  wordToGuess: FormControl<string>;
}

export function getWordleFormGroup(word: string): FormGroup<WordleFormGroup> {
  return new FormGroup<WordleFormGroup>({
    wordToGuess: new FormControl<string>(word, {
      nonNullable: true
    }),
    trueLetters: new FormArray<FormControl<string>>(
      word.split('').map(letter => new FormControl<string>(letter, {
        nonNullable: true
      })), { validators: [Validators.maxLength(word.length)] }),
    guessedLetters: new FormArray<FormControl<string | null>>(
      word.split('').map(_ => new FormControl<string | null>(null, {
        validators: [Validators.required, Validators.pattern('^[a-zA]$')]
      })), {
        validators: [Validators.maxLength(word.length)]
      })
  });
}

export function getLetterCountFormControl(letterCount?: number): FormControl<number> {
  return new FormControl<number>(letterCount ?? 5, {
    nonNullable: true,
    validators: [Validators.required, Validators.min(3), Validators.max(10)]
  });
}
