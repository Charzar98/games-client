import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { WordleComponent } from './games/wordle/wordle.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet,
    WordleComponent
  ],
  standalone: true
})
export class AppComponent {
  private readonly router = inject(Router);

  test() {
    // Fix Routing
    this.router.navigate(['../wordle']).catch(error => {
      console.log(error);
    });
  }
}
