import { Component, inject, input } from '@angular/core';
import { AbstractControl, FormGroupDirective, ValidationErrors } from '@angular/forms';
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
    return this.localeService.getLocale(this.getErrorKey(errors));
  }

  private getErrorKey(errors: ValidationErrors): string {
    if (errors['serverError']) return errors['serverError'];
    return Object.keys(errors)[0] ?? 'InvalidField';
  }
}
