import { Component, inject, signal } from '@angular/core';
import { BookFlixLogo } from '../book-flix-logo/book-flix-logo';
import { ResponsiveService } from '../../../core/services/responsive.service';
import { NavItem } from '../../../core/models/Navigation/nav.model';
import { NAV_CONFIG } from '../../../core/config/nav.config';
import { AuthService } from '../../../core/services/auth-service';
import { Router } from '@angular/router';
import { LocalePipe } from '../../pipes/locale-pipe';
import { DropdownMenu } from '../dropdown-menu/dropdown-menu';

@Component({
  selector: 'app-landing-page-header',
  imports: [BookFlixLogo, LocalePipe, DropdownMenu],
  templateUrl: './landing-page-header.html',
  styleUrl: './landing-page-header.scss',
})
export class LandingPageHeader {
  responsiveService = inject(ResponsiveService);
  authService = inject(AuthService);
  router = inject(Router);

  navItems = signal<NavItem[]>(NAV_CONFIG);
  activeHoveredId = signal<string | null>(null);
  onMenuHover(itemId: string) {
    this.activeHoveredId.set(itemId);
  }

  onMenuHoverOut() {
    this.activeHoveredId.set(null);
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
