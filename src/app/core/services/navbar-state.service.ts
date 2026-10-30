import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarStateService {
  readonly isNavbarOpen = signal<boolean>(false);
  open() {
    this.isNavbarOpen.set(true);
  }

  close() {
    this.isNavbarOpen.set(false);
  }

  toggle() {
    this.isNavbarOpen.update((current) => !current);
  }
}
