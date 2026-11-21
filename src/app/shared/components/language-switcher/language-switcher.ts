import { Component, inject, input } from '@angular/core';
import { LocaleService } from '../../../core/services/locale-service';

@Component({
  selector: 'app-language-switcher',
  imports: [],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss',
})
export class LanguageSwitcher {
  private localeService = inject(LocaleService);

  readonly currentLang = this.localeService.currentLanguage;

  variant = input<'compact' | 'full'>('compact');

  setLang(lang: string): void {
    if (this.currentLang() !== lang) {
      this.localeService.setLanguage(lang);
    }
  }

  toggleLang(): void {
    this.localeService.toggleLanguage();
  }
}
