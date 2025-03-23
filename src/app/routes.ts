import { Routes } from '@angular/router';
import { WordleComponent } from './games/wordle/component/wordle.component';
import { OverviewComponent } from '../overview/overview.component';

export const routes: Routes = [
  { path: '', component: OverviewComponent, title: 'Games Client - Overview' },
  { path: 'wordle', component: WordleComponent, title: 'Games Client - Wordle' },
];
