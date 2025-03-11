import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

export interface WordleFormGroup {
  letters: FormArray<FormControl<string>>;
  word: FormControl<string>;
}

export function getWordleFormGroup(word: string): FormGroup<WordleFormGroup> {
  const letters = word.split('');

  return new FormGroup<WordleFormGroup>({
    word: new FormControl<string>(word, {
      nonNullable: true
    }),
    letters: new FormArray<FormControl<string>>(letters.map(x => new FormControl<string>(x, { nonNullable: true })), {
      validators: [Validators.maxLength(word.length)]
    })
  })
}
