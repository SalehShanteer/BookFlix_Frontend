import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { PasswordHelper } from '../helpers/password-helper';

export function StrongPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const isValid = PasswordHelper.IsStrongPassword(value);
    return isValid ? null : { weakPassword: true };
  };
}
