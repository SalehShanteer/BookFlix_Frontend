import { Component, input } from '@angular/core';

@Component({
  selector: 'button[app-action-button], a[app-action-button]',
  imports: [],
  templateUrl: './action-button.html',
  styleUrl: './action-button.scss',
  host: {
    '[class.btn]': 'true',
    '[class.btn-primary]': 'variant() === "primary"',
    '[class.btn-secondary]': 'variant() === "secondary"',
    '[class.btn-outline-primary]': 'variant() === "outline-primary"',
    '[class.w-100]': 'fullWidth()',
    '[class.py-2]': 'true',
    '[class.disabled]': 'isLoading() || disabled()',
    '[attr.disabled]': '(isLoading() || disabled()) ? true : null',
    '[attr.aria-disabled]': 'isLoading() || disabled()',
    '[attr.aria-busy]': 'isLoading()',
  },
})
export class ActionButton {
  isLoading = input<boolean>(false);
  disabled = input<boolean>(false);
  variant = input<string>('primary');
  fullWidth = input<boolean>(true);
}


