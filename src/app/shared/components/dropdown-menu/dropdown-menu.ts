import { Component, input, output, inject } from '@angular/core';
import { LocalePipe } from '../../../shared/pipes/locale-pipe';
import { NavItem } from '../../../core/models/Navigation/nav.model';
import { RouterLink } from '@angular/router';
import { LocaleService } from '../../../core/services/locale-service';

@Component({
  selector: 'app-dropdown-menu',
  imports: [LocalePipe, RouterLink],
  templateUrl: './dropdown-menu.html',
  styleUrl: './dropdown-menu.scss',
})
export class DropdownMenu {
  item = input.required<NavItem>();
  childClicked = output<void>();
  private localeService = inject(LocaleService);

  getLocalized(key: string | undefined): string {
    return key ? this.localeService.getLocale(key) : '';
  }
}
