import { Injectable } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public isDarkModeOn() {
    return localStorage.getItem('theme') === 'dark';
  }

  public toggleDarkMode() {
    const themeToBe: Theme = !this.isDarkModeOn() ? 'dark' : 'light'

    document.documentElement.style.setProperty('color-scheme', themeToBe);
    localStorage.setItem('theme', themeToBe);
  }
}
