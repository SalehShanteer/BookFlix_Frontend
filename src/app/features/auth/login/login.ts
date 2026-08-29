import { Component, computed, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ILogin } from '../../../core/models/auth/login.model';
import { AuthService } from '../../../core/services/auth-service';
import { PasswordField } from '../../../shared/components/password-field/password-field';
import { LocalePipe } from '../../../shared/pipes/locale-pipe';
import { FormError } from '../../../shared/components/form-error/form-error';
import { EmailValidator } from '../../../shared/validators/email.validator';
import { BaseComponent } from '../../../shared/base/base-component';
import { ActionButton } from '../../../shared/components/action-button/action-button';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, PasswordField, LocalePipe, RouterLink, FormError, ActionButton],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login extends BaseComponent{
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    super();
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, EmailValidator()]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;

    const loginRequest: ILogin = this.loginForm.value;
    this.isLoading.set(true);
    this.authService.login(loginRequest).subscribe({
      next: () => {
        console.log('Login successful');
        this.isLoading.set(false);
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.isLoading.set(false);

        const message = err?.error.message || err?.error;

        this.loginForm.get('password')?.setErrors({serverError: message})
      },
    });
  }
}
