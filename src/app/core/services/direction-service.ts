import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DirectionService {
  private readonly bootstrapLinkId = 'bootstrap-theme-style';

  setDirection(lang: string) {
    const isRtl = lang === 'ar';
    const dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);

    this.updateBootstrapStylesheet(isRtl);
  }

  private updateBootstrapStylesheet(isRtl: boolean) {
    let link = document.getElementById(this.bootstrapLinkId) as HTMLLinkElement | null;
    const href = isRtl ? 'bootstrap.rtl.min.css' : 'bootstrap.min.css';

    if (!link) {
      link = document.createElement('link');
      link.id = this.bootstrapLinkId;
      link.rel = 'stylesheet';
      document.head.prepend(link);
    }

    if (link.getAttribute('href') !== href) {
      link.setAttribute('href', href);
    }
  }
}
