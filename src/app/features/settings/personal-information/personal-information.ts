import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { LocalePipe } from '../../../shared/pipes/locale-pipe';
import { IconBadge } from '../../../shared/components/icon-badge/icon-badge';
import { UserService } from '../../../core/services/user-service';
import { User } from '../../../core/models/User/user.model';
import { ActionButton } from '../../../shared/components/action-button/action-button';
import { FormError } from '../../../shared/components/form-error/form-error';
import { EmailValidator } from '../../../shared/validators/email.validator';

@Component({
  selector: 'app-personal-information',
  imports: [CommonModule, ReactiveFormsModule, LocalePipe, IconBadge, ActionButton, FormError],
  templateUrl: './personal-information.html',
  styleUrl: './personal-information.scss',
})
export class PersonalInformation implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  user = signal<User | null>(null);
  isLoadingUser = signal<boolean>(false);
  isSaving = signal<boolean>(false);
  successMessage = signal<string | null>(null);
  serverError = signal<string | null>(null);

  infoForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, EmailValidator()]],
  });

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.isLoadingUser.set(true);
    this.serverError.set(null);

    this.userService.getUserProfile().subscribe({
      next: (userData: User) => {
        this.user.set(userData);
        this.isLoadingUser.set(false);

        this.infoForm.patchValue({
          username: userData.username || '',
          email: userData.email || '',
        });
      },
      error: (err) => {
        this.isLoadingUser.set(false);
        console.error('Failed to load user profile', err);
        const errorMsg = err.error?.error || err.error?.message || 'ServerErrorMessage';
        this.serverError.set(errorMsg);
      },
    });
  }

  get registrationFormatted(): string {
    const raw = this.user()?.createdAt;
    if (!raw) return 'July 2024';
    const date = new Date(raw);
    if (isNaN(date.getTime())) return raw;
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  get isFormChanged(): boolean {
    const currentUser = this.user();
    if (!currentUser) return false;
    const currentUsername = this.infoForm.get('username')?.value?.trim();
    const currentEmail = this.infoForm.get('email')?.value?.trim();
    return currentUsername !== currentUser.username || currentEmail !== currentUser.email;
  }

  onSave(): void {
    this.infoForm.markAllAsTouched();
    if (this.infoForm.invalid) {
      return;
    }

    const currentUser = this.user();
    const newUsername = this.infoForm.get('username')?.value?.trim();
    const newEmail = this.infoForm.get('email')?.value?.trim();

    const usernameChanged = currentUser && newUsername !== currentUser.username;
    const emailChanged = currentUser && newEmail !== currentUser.email;

    if (!usernameChanged && !emailChanged) {
      return;
    }

    this.isSaving.set(true);
    this.successMessage.set(null);
    this.serverError.set(null);

    const calls: { [key: string]: any } = {};
    if (usernameChanged) {
      calls['username'] = this.userService.updateUsername({ username: newUsername });
    }
    if (emailChanged) {
      calls['email'] = this.userService.updateEmail({ email: newEmail });
    }

    forkJoin(calls).subscribe({
      next: (results: any) => {
        this.isSaving.set(false);
        this.successMessage.set('ProfileUpdatedSuccessfully');

        const updatedData = { ...this.user()! };
        if (results['username']) {
          Object.assign(updatedData, results['username']);
        }
        if (results['email']) {
          Object.assign(updatedData, results['email']);
        }
        if (newUsername) updatedData.username = newUsername;
        if (newEmail) updatedData.email = newEmail;

        this.user.set(updatedData);
      },
      error: (err) => {
        this.isSaving.set(false);
        console.error('Failed to update personal info', err);
        const errorMsg = err.error?.error || err.error?.message || 'ServerErrorMessage';
        this.serverError.set(errorMsg);
      },
    });
  }
}
