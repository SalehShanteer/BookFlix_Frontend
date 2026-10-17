import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LocalePipe } from '../../pipes/locale-pipe';
import { AuthService } from '../../../core/services/auth-service';
import { BookFlixLogo } from '../book-flix-logo/book-flix-logo';

@Component({
  selector: 'app-navbar',
  imports: [LocalePipe, RouterModule, BookFlixLogo],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}
  isMenuCollapsed = signal(true);

  toggleMenu() {
    this.isMenuCollapsed.update((state) => !state);
  }

  closeMenu() {
    this.isMenuCollapsed.set(true);
  }

  signOut() {
    this.authService.logoutBackend().subscribe({
      next: () => {
        this.router.navigate(['login']);
      },
      error: () => {
        this.authService.forceLogout();
      },
    });
  }
}
