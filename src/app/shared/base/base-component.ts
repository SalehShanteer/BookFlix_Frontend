import { inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

export abstract class BaseComponent {
  protected router = inject(Router);
  isLoading = signal(false);
  serverError = signal<string | null>(null);

  protected getServerErrorMessage(err: HttpErrorResponse): string {
    const message = err.error?.error;
    return typeof message === 'string' && message.trim() ? message : 'ServerErrorMessage';
  }
}
