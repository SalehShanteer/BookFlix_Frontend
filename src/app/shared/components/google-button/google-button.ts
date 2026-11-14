import { Component, input, output } from '@angular/core';
import { LocalePipe } from '../../pipes/locale-pipe';
import { GoogleIcon } from '../google-icon/google-icon';

@Component({
  selector: 'app-google-button',
  imports: [LocalePipe, GoogleIcon],
  templateUrl: './google-button.html',
  styleUrl: './google-button.scss',
})
export class GoogleButton {
  text = input<string>('ContinueWithGoogle');
  isLoading = input<boolean>(false);
  disabled = input<boolean>(false);
  fullWidth = input<boolean>(true);
  clicked = output<void>();

  onClick(): void {
    if (!this.isLoading() && !this.disabled()) {
      this.clicked.emit();
    }
  }
}
