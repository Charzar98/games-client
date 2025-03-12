import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { WordleComponent } from './games/wordle/wordle.component';

const routes: Routes = [
  // Create overview page and replace AppComponent with it
  // { path: '', component: AppComponent },
  { path: 'wordle', component: WordleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    provideRouter(routes)
  ]
})
export class AppRoutingModule {
}
