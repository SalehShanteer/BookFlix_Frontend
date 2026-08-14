import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function EmailValidator(): ValidatorFn {
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (!value) return null;
        const isValid = EMAIL_REGEX.test(value.trim());
        return isValid ? null : { invalidEmail: true };
    };
}