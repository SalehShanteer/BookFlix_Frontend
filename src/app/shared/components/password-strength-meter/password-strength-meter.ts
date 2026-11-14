import { Component, computed, input } from '@angular/core';
import { LocalePipe } from '../../pipes/locale-pipe';
import { PasswordHelper } from '../../helpers/password-helper';

@Component({
  selector: 'app-password-strength-meter',
  imports: [LocalePipe],
  templateUrl: './password-strength-meter.html',
  styleUrl: './password-strength-meter.scss',
})
export class PasswordStrengthMeter {
  password = input<string | null | undefined>('');

  readonly strengthSegments = [1, 2, 3, 4];

  readonly strength = computed(() => {
    return PasswordHelper.getPasswordStrength(this.password() ?? '');
  });
}
