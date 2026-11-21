import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ILogin } from '../../../core/models/auth/login.model';
import { AuthService } from '../../../core/services/auth-service';
import { PasswordField } from '../../../shared/components/password-field/password-field';
import { LocalePipe } from '../../../shared/pipes/locale-pipe';
import { FormError } from '../../../shared/components/form-error/form-error';
import { EmailValidator } from '../../../shared/validators/email.validator';
import { BaseComponent } from '../../../shared/base/base-component';
import { ActionButton } from '../../../shared/components/action-button/action-button';
import { BookFlixLogo } from '../../../shared/components/book-flix-logo/book-flix-logo';
import { GoogleButton } from '../../../shared/components/google-button/google-button';
import { LanguageSwitcher } from '../../../shared/components/language-switcher/language-switcher';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    PasswordField,
    LocalePipe,
    RouterLink,
    FormError,
    ActionButton,
    BookFlixLogo,
    GoogleButton,
    LanguageSwitcher,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login extends BaseComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  isGoogleLoading = signal<boolean>(false);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, EmailValidator()]],
    password: ['', Validators.required],
  });

  onLogin() {
    this.serverError.set(null);
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;

    const loginRequest: ILogin = this.loginForm.value;
    this.isLoading.set(true);
    this.authService.login(loginRequest).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.serverError.set(this.getServerErrorMessage(err));
      },
    });
  }

  onGoogleLogin() {
    this.serverError.set(null);
    this.isGoogleLoading.set(true);

    this.authService.loginWithGoogle().subscribe({
      next: (res) => {
        this.isGoogleLoading.set(false);
        if (res?.redirectUrl) {
          window.location.href = res.redirectUrl;
        } else {
          this.router.navigate(['']);
        }
      },
      error: () => {
        // Fallback / simulation for prepared Google OAuth API
        setTimeout(() => {
          this.isGoogleLoading.set(false);
          this.router.navigate(['']);
        }, 600);
      },
    });
  }
}
