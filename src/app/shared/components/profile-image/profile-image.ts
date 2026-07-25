import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { UserService } from '../../../core/services/user-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-image',
  imports: [],
  templateUrl: './profile-image.html',
  styleUrl: './profile-image.scss',
})
export class ProfileImage implements OnInit, OnDestroy {
  profileImageUrl = signal<string | null>(null);
  isUploading = signal<boolean>(false);

  private imageSubscription?: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadProfileImage();
  }

  loadProfileImage(): void {
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
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    this.isUploading.set(true);

    this.userService.uploadProfileImage(file).subscribe({
      next: () => {
        this.isUploading.set(false);
        this.loadProfileImage();
      },
      error: (err) => {
        this.isUploading.set(false);
        console.error('Failed to upload profile image', err);
      },
    });

    input.value = '';
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
