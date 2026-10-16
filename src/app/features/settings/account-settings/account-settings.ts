import { Component } from '@angular/core';
import { LocalePipe } from '../../../shared/pipes/locale-pipe';
import { ProfileImage } from '../../../shared/components/profile-image/profile-image';
import { IconBadge } from '../../../shared/components/icon-badge/icon-badge';

@Component({
  selector: 'app-account-settings',
  imports: [LocalePipe, ProfileImage, IconBadge],
  templateUrl: './account-settings.html',
  styleUrl: './account-settings.scss',
})
export class AccountSettings {}
