import { Injectable, signal } from '@angular/core';
import { DirectionService } from './direction-service';
import localeEnData from '../../../assets/Locale/LocaleEn.json';
import localeArData from '../../../assets/Locale/LocaleAr.json';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  private readonly englishCode: string = 'en';
  private readonly arabicCode: string = 'ar';
  readonly currentLanguage = signal<string>(this.englishCode);
  private localeEn: Record<string, string> = localeEnData;
  private localeAr: Record<string, string> = localeArData;
  constructor(private directionService: DirectionService) {}

  loadLanguage(): Promise<void> {
    return new Promise((resolve) => {
      const savedLanguage = localStorage.getItem('language');
      const lang = savedLanguage === this.arabicCode ? this.arabicCode : this.englishCode;
      this.currentLanguage.set(lang);
      this.directionService.setDirection(lang);
      console.log('Loaded language:', lang);
      resolve();
    });
  }

  setLanguage(language: string): void {
    const selectedLanguage =
      language === this.arabicCode ? this.arabicCode : this.englishCode;
    localStorage.setItem('language', selectedLanguage);
    this.currentLanguage.set(selectedLanguage);
    this.directionService.setDirection(selectedLanguage);
  }

  toggleLanguage(): void {
    const nextLang =
      this.currentLanguage() === this.englishCode ? this.arabicCode : this.englishCode;
    this.setLanguage(nextLang);
  }

  getLocale(key: string): string {
    key = key[0].toUpperCase() + key.slice(1);
    return this.currentLanguage() === 'ar'
      ? (this.localeAr[key] ?? key)
      : (this.localeEn[key] ?? key);
  }

  getCurrentLanguage(): string {
    return this.currentLanguage();
  }
}
