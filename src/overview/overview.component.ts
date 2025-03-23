import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
  private router: Router = inject(Router);

  public async navigateToGame(gameUrl: string) {
    await this.router.navigate([`/${gameUrl}`]);
  }
}
