import { signal } from "@angular/core";

export class BaseComponent {
  constructor(){}
  isLoading = signal(false);
}
