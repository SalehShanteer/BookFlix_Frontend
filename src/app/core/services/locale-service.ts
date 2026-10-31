import { Injectable } from '@angular/core';
import { DirectionService } from './direction-service';
import localeEnData from '../../../assets/Locale/LocaleEn.json';
import localeArData from '../../../assets/Locale/LocaleAr.json';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  private readonly englishCode: string = 'en';
  private readonly arabicCode: string = 'ar';
  private currentLanguage: string = this.englishCode;
  private localeEn: Record<string, string> = localeEnData;
  private localeAr: Record<string, string> = localeArData;
  constructor(private directionService: DirectionService) {}

  loadLanguage(): Promise<void> {
    return new Promise((resolve) => {
      const savedLanguage = localStorage.getItem('language');
      this.currentLanguage = savedLanguage ?? this.englishCode;
      this.directionService.setDirection(this.currentLanguage);
      console.log('Loaded language:', this.currentLanguage);
      resolve();
    });
  }

  setLanguage(language: string): void {
    const selectedLanguage =
      language === this.arabicCode ? this.arabicCode : this.englishCode;
    localStorage.setItem('language', selectedLanguage);
    this.loadLanguage();
  }

  toggleLanguage(): void {
    const selectedLanguage =
      localStorage.getItem('language') === this.englishCode
        ? this.arabicCode
        : this.englishCode;
    this.setLanguage(selectedLanguage);
  }

  getLocale(key: string): string {
    key = key[0].toUpperCase() + key.slice(1);
    return this.currentLanguage === 'ar'
      ? (this.localeAr[key] ?? key)
      : (this.localeEn[key] ?? key);
  }

  getCurrentLanguage(): string {
    return this.currentLanguage;
  }
}
