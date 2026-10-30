import { Component, inject, computed } from '@angular/core';
import { Navbar } from '../../shared/components/navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { LandingPageHeader } from '../../shared/components/landing-page-header/landing-page-header';
import { NavbarStateService } from '../../core/services/navbar-state.service';
import { ResponsiveService } from '../../core/services/responsive.service';

@Component({
  selector: 'app-main-layout',
  imports: [Navbar, LandingPageHeader, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  navbarState = inject(NavbarStateService);
  responsiveService = inject(ResponsiveService);

  readonly showBackdrop = computed(
    () => this.navbarState.isNavbarOpen() && this.responsiveService.isMobile()
  );

  closeNavbar() {
    this.navbarState.close();
  }
}
