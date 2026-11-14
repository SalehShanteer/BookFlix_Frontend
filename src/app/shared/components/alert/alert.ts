import { Component, computed, input } from '@angular/core';
import { LocalePipe } from '../../pipes/locale-pipe';

@Component({
  selector: 'app-alert',
  imports: [LocalePipe],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
})
export class Alert {
  message = input<string | null | undefined>(null);
  type = input<'danger' | 'success' | 'warning' | 'info'>('danger');

  readonly icon = computed(() => {
    switch (this.type()) {
      case 'success':
        return 'bi-check-circle-fill';
      case 'warning':
        return 'bi-exclamation-triangle-fill';
      case 'info':
        return 'bi-info-circle-fill';
      case 'danger':
      default:
        return 'bi-exclamation-circle-fill';
    }
  });
}
