import { Routes } from '@angular/router';
import { WordleComponent } from './games/wordle/component/wordle.component';
import { OverviewComponent } from '../overview/overview.component';
import { TicTacToeComponent } from "./games/tic-tac-toe/component/tic-tac-toe.component";

export const routes: Routes = [
  { path: '', component: OverviewComponent, title: 'Games Client - Overview' },
  { path: 'wordle', component: WordleComponent, title: 'Games Client - Wordle' },
  { path: 'tic-tac-toe', component: TicTacToeComponent, title: 'Games Client - Tic Tac Toe' },
];
