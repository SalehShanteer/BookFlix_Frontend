import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { LocalePipe } from '../../../shared/pipes/locale-pipe';
import { ProfileImage } from '../../../shared/components/profile-image/profile-image';
import { UserService } from '../../../core/services/user-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-settings',
  imports: [LocalePipe, ProfileImage],
  templateUrl: './account-settings.html',
  styleUrl: './account-settings.scss'
})
export class AccountSettings implements OnInit, OnDestroy {
  profileImageUrl = signal<string | null>(null);
  private imageSubscription?: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.imageSubscription = this.userService.getUserProfileImage().subscribe({
      next: (blob) => {
        if (this.profileImageUrl()) {
          URL.revokeObjectURL(this.profileImageUrl()!);
        }
        const url = URL.createObjectURL(blob);
        this.profileImageUrl.set(url);
      },
      error: (err) => {
        console.error('Failed to load profile image', err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.imageSubscription) {
      this.imageSubscription.unsubscribe();
    }
    if (this.profileImageUrl()) {
      URL.revokeObjectURL(this.profileImageUrl()!);
    }
  }
}
