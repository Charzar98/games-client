import { FormControl, FormGroup } from "@angular/forms";

interface TicTacToeType {
  x: 'x';
  y: 'y';
}

export interface TicTacToeFormGroup {
  a1: FormControl<TicTacToeType | null>;
  a2: FormControl<TicTacToeType | null>;
  a3: FormControl<TicTacToeType | null>;
  b1: FormControl<TicTacToeType | null>;
  b2: FormControl<TicTacToeType | null>;
  b3: FormControl<TicTacToeType | null>;
  c1: FormControl<TicTacToeType | null>;
  c2: FormControl<TicTacToeType | null>;
  c3: FormControl<TicTacToeType | null>;
}

export function GetTicTacToeFormGroup(): FormGroup<TicTacToeFormGroup> {
  return new FormGroup<TicTacToeFormGroup>({
    a1: new FormControl<TicTacToeType | null>(null),
    a2: new FormControl<TicTacToeType | null>(null),
    a3: new FormControl<TicTacToeType | null>(null),
    b1: new FormControl<TicTacToeType | null>(null),
    b2: new FormControl<TicTacToeType | null>(null),
    b3: new FormControl<TicTacToeType | null>(null),
    c1: new FormControl<TicTacToeType | null>(null),
    c2: new FormControl<TicTacToeType | null>(null),
    c3: new FormControl<TicTacToeType | null>(null)
  })
}
