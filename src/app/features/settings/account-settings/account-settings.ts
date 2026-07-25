import { Component } from '@angular/core';
import { LocalePipe } from '../../../shared/pipes/locale-pipe';
import { ProfileImage } from '../../../shared/components/profile-image/profile-image';

@Component({
  selector: 'app-account-settings',
  imports: [LocalePipe, ProfileImage],
  templateUrl: './account-settings.html',
  styleUrl: './account-settings.scss',
})
export class AccountSettings {}

