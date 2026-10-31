import { Component } from '@angular/core';
import { LocalePipe } from '../../../shared/pipes/locale-pipe';
import { IconBadge } from '../../../shared/components/icon-badge/icon-badge';

@Component({
  selector: 'app-personal-information',
  imports: [LocalePipe, IconBadge],
  templateUrl: './personal-information.html',
  styleUrl: './personal-information.scss',
})
export class PersonalInformation {}