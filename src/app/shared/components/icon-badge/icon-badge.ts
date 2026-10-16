import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-icon-badge',
  imports: [],
  templateUrl: './icon-badge.html',
  styleUrl: './icon-badge.scss',
})
export class IconBadge {
  icon = input<string>();
  iconClass = computed(() => `bi ${this.icon()}`);
}
