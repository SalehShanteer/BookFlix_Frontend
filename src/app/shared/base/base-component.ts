import { inject, signal } from '@angular/core';
import { Router } from '@angular/router';

export abstract class BaseComponent {
  protected router = inject(Router);
  isLoading = signal(false);
}
