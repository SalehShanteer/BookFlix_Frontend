import { Component } from '@angular/core';
import { BookFlixLogo } from '../book-flix-logo/book-flix-logo';

@Component({
  selector: 'app-landing-page-header',
  imports: [BookFlixLogo],
  templateUrl: './landing-page-header.html',
  styleUrl: './landing-page-header.scss',
})
export class LandingPageHeader {}
