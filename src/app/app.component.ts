import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ThemeService } from './services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet,
    RouterLink,
    MatIconButton,
    MatIcon,
  ],
  standalone: true
})
export class AppComponent {
  private readonly themeService: ThemeService = inject(ThemeService);

  public toggleTheme() {
    this.themeService.toggleDarkMode();
  }

  public isDarkModeOn() {
    return this.themeService.isDarkModeOn();
  }
}
