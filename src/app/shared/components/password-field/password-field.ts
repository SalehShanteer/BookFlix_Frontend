import { Component, forwardRef, input, signal } from '@angular/core';
import { LocalePipe } from '../../pipes/locale-pipe';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-password-field',
  imports: [LocalePipe],
  templateUrl: './password-field.html',
  styleUrl: './password-field.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordField),
      multi: true,
    },
  ],
})
export class PasswordField implements ControlValueAccessor {
  placeholder = input<string>('');
  icon = input<string>('');

  show = signal<boolean>(false);
  value = signal<string>('');

  onToggle(): void {
    this.show.update((current) => !current);
  }

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value.set(value || '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  updateValue(val: string): void {
    this.value.set(val);
    this.onChange(val);
  }
}
