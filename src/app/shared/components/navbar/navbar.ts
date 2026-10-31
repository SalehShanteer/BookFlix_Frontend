import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LocalePipe } from '../../pipes/locale-pipe';
import { LocaleService } from '../../../core/services/locale-service';
import { AuthService } from '../../../core/services/auth-service';
import { BookFlixLogo } from '../book-flix-logo/book-flix-logo';
import { NavbarStateService } from '../../../core/services/navbar-state.service';
import { ResponsiveService } from '../../../core/services/responsive.service';
import { NAV_CONFIG } from '../../../core/config/nav.config';
import { NavItem } from '../../../core/models/Navigation/nav.model';

@Component({
  selector: 'app-navbar',
  imports: [LocalePipe, RouterModule, BookFlixLogo],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  navbarState = inject(NavbarStateService);
  responsiveService = inject(ResponsiveService);
  authService = inject(AuthService);
  router = inject(Router);
  localeService = inject(LocaleService);

  readonly isNavbarOpen = this.navbarState.isNavbarOpen;
  readonly navItems = signal<NavItem[]>(NAV_CONFIG);
  readonly expandedId = signal<string | null>(null);
  currentLang = signal<string>(localStorage.getItem('language') ?? 'en');

  constructor() {
    if (this.responsiveService.isMobile()) {
      this.navbarState.close();
    }
  }

  isExpanded(id: string) {
    return this.expandedId() === id;
  }

  toggleItem(id: string) {
    this.expandedId.update((current) => (current === id ? null : id));
  }

  closeNavbar() {
    this.navbarState.close();
  }

  toggleNavbar() {
    this.navbarState.toggle();
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

  toggleLang() {
    this.localeService.toggleLanguage();
    this.currentLang.set(localStorage.getItem('language') ?? 'en');
  }

  setLang(lang: string) {
    this.localeService.setLanguage(lang);
    this.currentLang.set(lang);
  }
}
