import { Component, inject, input } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';
import { LocaleService } from '../../../core/services/locale-service';

@Component({
  selector: 'app-form-error',
  imports: [],
  templateUrl: './form-error.html',
  styleUrl: './form-error.scss',
})
export class FormError {
  control = input<AbstractControl | null>(null);
  customError = input<string | null>(null);
  private formDirective = inject(FormGroupDirective, { optional: true });
  private localeService = inject(LocaleService);

  shouldShowError(): boolean {
    if (this.customError()) return true;
    const ctrl = this.control();
    if (!ctrl || !ctrl.invalid) return false;
    return this.formDirective?.submitted ?? false;
  }

  errorMessage(): string {
    if (this.customError()) {
      return this.localeService.getLocale(this.customError()!);
    }

    const errors = this.control()?.errors;
    if (!errors) return '';

    if (errors['serverError']) {
      return this.localeService.getLocale(errors['serverError']);
    }
    if (errors['required']) {
      return this.localeService.getLocale('FieldRequired');
    }
    if (errors['invalidEmail']) {
      return this.localeService.getLocale('InvalidEmail');
    }
    if (errors['minlength']) {
      return this.localeService.getLocale('MinLengthError');
    }
    if (errors['passwordWeak']) {
      return this.localeService.getLocale('PasswordWeak');
    }
    if (errors['passwordMismatch']) {
      return this.localeService.getLocale('PasswordMismatch');
    }
    if (errors['usernameUsed']) {
      return this.localeService.getLocale('UsernameUsed');
    }
    if (errors['emailUsed']) {
      return this.localeService.getLocale('EmailUsed');
    }
  
    return this.localeService.getLocale('InvalidField');
  }
}



