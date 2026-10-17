import { Component } from '@angular/core';
import { Navbar } from '../../shared/components/navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { LandingPageHeader } from '../../shared/components/landing-page-header/landing-page-header';

@Component({
  selector: 'app-main-layout',
  imports: [Navbar, LandingPageHeader, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {}
