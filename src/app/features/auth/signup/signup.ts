import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth-service';
import { RouterLink } from '@angular/router';
import { ISignup } from '../../../core/models/auth/signup.model';
import { PasswordMatchValidator } from '../../../shared/validators/password-match.validator';
import { LocalePipe } from '../../../shared/pipes/locale-pipe';
import { BaseComponent } from '../../../shared/base/base-component';
import { PasswordField } from '../../../shared/components/password-field/password-field';
import { ActionButton } from '../../../shared/components/action-button/action-button';
import { FormError } from '../../../shared/components/form-error/form-error';
import { StrongPasswordValidator } from '../../../shared/validators/strong-password.validator';
import { EmailValidator } from '../../../shared/validators/email.validator';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, LocalePipe, PasswordField, RouterLink, ActionButton, FormError],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class SignUp extends BaseComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  registerForm: FormGroup = this.fb.group(
    {
      username: ['', Validators.required],
      email: ['', [Validators.required, EmailValidator()]],
      newPassword: ['', [Validators.required, StrongPasswordValidator()]],
      confirmPassword: ['', Validators.required],
    },
    { validators: PasswordMatchValidator },
  );

  private showDashboardScreen() {
    console.log('register successful');
    this.router.navigate(['']);
  }

  onSignUp() {
    this.serverError.set(null);
    this.registerForm.markAllAsTouched();
    if (!this.registerForm.valid) return;

    this.isLoading.set(true);
    const { username, email, newPassword } = this.registerForm.value;
    const registerRequest: ISignup = {
      username,
      email,
      password: newPassword,
    };
    this.authService.signup(registerRequest).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.showDashboardScreen();
      },
      error: (err) => {
        this.isLoading.set(false);
        this.serverError.set(this.getServerErrorMessage(err));
      },
    });
  }
}
