import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

export type LetterState = 'absent' | 'present' | 'correct';

export interface GuessedLetterFormControl {
  letterValue: FormControl<string | null>;
  letterState: FormControl<LetterState | null>;
}

// Parent form group
export interface WordleFormGroup {
  // Individual letters obtained from the random word
  trueLetters: FormArray<FormControl<string>>;
  // Individual letters from the word the user has guessed
  guessedLetters: FormArray<FormGroup<GuessedLetterFormControl>>;
  wordToGuess: FormControl<string>;
  // Number of letters in wordToGuess + 1
  numberOfGuesses: FormControl<number>;
}

function getGuessedLetterFormGroup() {
  return new FormGroup<GuessedLetterFormControl>({
    letterValue: new FormControl<string | null>(null, {
      validators: [Validators.required, Validators.pattern('^[a-zA]$')]
    }),
    letterState: new FormControl<LetterState | null>(null)
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
      word.split('').map(_ => getGuessedLetterFormGroup())),
    numberOfGuesses: new FormControl<number>(word.length + 1, {
      nonNullable: true,
      validators: [Validators.min(1), Validators.max(word.length + 1)]
    }),
  });
}

export function getLetterCountFormControl(letterCount?: number): FormControl<number> {
  return new FormControl<number>(letterCount ?? 5, {
    nonNullable: true,
    validators: [Validators.required, Validators.min(3), Validators.max(10)]
  });
}

export const keyboardLetters: string[][] = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
]
