import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

export enum LetterState {
  Null,
  Absent,
  Present,
  Correct
}

export interface GuessedLetterFormControl {
  letterValue: FormControl<string | null>;
  letterState: FormControl<LetterState>;
}

export interface WordleFormGroup {
  // Individual letters obtained from the random word
  trueLetters: FormArray<FormControl<string>>;
  // Individual letters from the word the user has guessed
  guessedLetters: FormArray<FormGroup<GuessedLetterFormControl>>;
  wordToGuess: FormControl<string>;
}

function getGuessedLetterFormGroup() {
  return new FormGroup<GuessedLetterFormControl>({
    letterValue: new FormControl<string | null>(null, {
      validators: [Validators.required, Validators.pattern('^[a-zA]$')]
    }),
    letterState: new FormControl<LetterState>(LetterState.Null, { nonNullable: true })
  });
}

export function getWordleFormGroup(word: string): FormGroup<WordleFormGroup> {
  return new FormGroup<WordleFormGroup>({
    wordToGuess: new FormControl<string>(word, {
      nonNullable: true
    }),
    trueLetters: new FormArray<FormControl<string>>(
      word.split('').map(letter => new FormControl<string>(letter, {
        nonNullable: true
      }))),
    guessedLetters: new FormArray<FormGroup<GuessedLetterFormControl>>(
      word.split('').map(_ => getGuessedLetterFormGroup()))
  });
}

export function getLetterCountFormControl(letterCount?: number): FormControl<number> {
  return new FormControl<number>(letterCount ?? 5, {
    nonNullable: true,
    validators: [Validators.required, Validators.min(3), Validators.max(10)]
  });
}
