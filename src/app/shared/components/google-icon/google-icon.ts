import { Component, input } from '@angular/core';

@Component({
  selector: 'app-google-icon',
  imports: [],
  templateUrl: './google-icon.html',
  styleUrl: './google-icon.scss',
})
export class GoogleIcon {
  size = input<number>(18);
  ariaHidden = input<boolean>(true);
}
