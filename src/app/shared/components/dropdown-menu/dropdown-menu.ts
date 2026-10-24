import { Component, input } from '@angular/core';
import { NavItem } from '../../../core/models/Navigation/nav.model';

@Component({
  selector: 'app-dropdown-menu',
  imports: [],
  templateUrl: './dropdown-menu.html',
  styleUrl: './dropdown-menu.scss',
})
export class DropdownMenu {
  item = input.required<NavItem>();
}
