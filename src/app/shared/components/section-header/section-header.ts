import { Component, input } from '@angular/core';
import { LocalePipe } from '../../pipes/locale-pipe';
import { IconBadge } from '../icon-badge/icon-badge';

@Component({
  selector: 'app-section-header',
  imports: [LocalePipe, IconBadge],
  templateUrl: './section-header.html',
  styleUrl: './section-header.scss',
})
export class SectionHeader {
  icon = input<string>('');
  title = input<string>('');
  description = input<string>('');
}
