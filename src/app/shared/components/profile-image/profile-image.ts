import { Component, input } from '@angular/core';

@Component({
  selector: 'app-profile-image',
  imports: [],
  templateUrl: './profile-image.html',
  styleUrl: './profile-image.scss'
})
export class ProfileImage {
  imageUrl = input<string | null>(null);
}
