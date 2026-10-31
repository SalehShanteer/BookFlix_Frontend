import { Component, input, output } from '@angular/core';
import { NavItem } from '../../../core/models/Navigation/nav.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dropdown-menu',
  imports: [RouterLink],
  templateUrl: './dropdown-menu.html',
  styleUrl: './dropdown-menu.scss',
})
export class DropdownMenu {
  item = input.required<NavItem>();
  childClicked = output<void>();
}
