import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { WordleComponent } from "./games/wordle/wordle.component";

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
  title = 'games-client';
}
