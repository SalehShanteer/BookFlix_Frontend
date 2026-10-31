import { Component } from '@angular/core';
import { LocalePipe } from '../../../shared/pipes/locale-pipe';
import { IconBadge } from '../../../shared/components/icon-badge/icon-badge';

@Component({
  selector: 'app-security-password',
  imports: [LocalePipe, IconBadge],
  templateUrl: './security-password.html',
  styleUrl: './security-password.scss',
})
export class SecurityPassword {}
