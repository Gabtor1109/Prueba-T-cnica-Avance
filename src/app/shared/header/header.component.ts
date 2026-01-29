import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule,
    MatFormFieldModule, MatInputModule, MatDividerModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showMobileSearch = false;

  // senal simple para refrescar estado al cambiar sesion
  private tick = signal(0);
  isLoggedIn = computed(() => (this.tick(), this.auth.isLoggedIn()));
  email = computed(() => (this.tick(), this.auth.getEmail()));

  constructor(private auth: AuthService, private router: Router) {
    this.auth.session$.subscribe(() => this.tick.update(v => v + 1));
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/home');
  }
}
