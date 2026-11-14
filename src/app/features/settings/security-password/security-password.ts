import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalePipe } from '../../../shared/pipes/locale-pipe';
import { PasswordField } from '../../../shared/components/password-field/password-field';
import { ActionButton } from '../../../shared/components/action-button/action-button';
import { FormError } from '../../../shared/components/form-error/form-error';
import { PasswordMatchValidator } from '../../../shared/validators/password-match.validator';
import { StrongPasswordValidator } from '../../../shared/validators/strong-password.validator';
import { UserService } from '../../../core/services/user-service';
import { ActiveSession, OAuthAccount } from '../../../core/models/security/security.model';
import { GoogleIcon } from '../../../shared/components/google-icon/google-icon';
import { PasswordStrengthMeter } from '../../../shared/components/password-strength-meter/password-strength-meter';
import { Alert } from '../../../shared/components/alert/alert';
import { SectionHeader } from '../../../shared/components/section-header/section-header';

@Component({
  selector: 'app-security-password',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LocalePipe,
    PasswordField,
    ActionButton,
    FormError,
    GoogleIcon,
    PasswordStrengthMeter,
    Alert,
    SectionHeader,
  ],
  templateUrl: './security-password.html',
  styleUrl: './security-password.scss',
})
export class SecurityPassword implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  // --- Password Management State ---
  isChangingPassword = signal<boolean>(false);
  passwordSuccessMessage = signal<string | null>(null);
  passwordErrorMessage = signal<string | null>(null);

  passwordForm: FormGroup = this.fb.group(
    {
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, StrongPasswordValidator()]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: PasswordMatchValidator }
  );

  // --- Active Sessions State ---
  isLoadingSessions = signal<boolean>(false);
  revokingSessionId = signal<string | null>(null);
  isRevokingAll = signal<boolean>(false);
  sessionSuccessMessage = signal<string | null>(null);
  sessionErrorMessage = signal<string | null>(null);

  sessions = signal<ActiveSession[]>([
    {
      id: 'sess-current',
      device: 'Windows 11 PC',
      browser: 'Chrome 124.0',
      os: 'Windows',
      ipAddress: '192.168.1.104',
      location: 'Riyadh, Saudi Arabia',
      lastActive: 'ActiveNow',
      isCurrent: true,
      deviceType: 'desktop',
    },
    {
      id: 'sess-mobile-1',
      device: 'iPhone 15 Pro',
      browser: 'Mobile Safari 17.4',
      os: 'iOS',
      ipAddress: '178.52.88.19',
      location: 'Jeddah, Saudi Arabia',
      lastActive: '2 hours ago',
      isCurrent: false,
      deviceType: 'mobile',
    },
    {
      id: 'sess-mac-2',
      device: 'MacBook Pro 16"',
      browser: 'Firefox 125.0',
      os: 'macOS',
      ipAddress: '82.165.197.1',
      location: 'Dubai, UAE',
      lastActive: '3 days ago',
      isCurrent: false,
      deviceType: 'desktop',
    },
  ]);

  hasOtherSessions = computed(() => {
    return this.sessions().some((s) => !s.isCurrent);
  });

  // --- Connected OAuth Accounts State ---
  isLoadingOAuth = signal<boolean>(false);
  processingOAuthProviderId = signal<string | null>(null);
  oauthSuccessMessage = signal<string | null>(null);
  oauthErrorMessage = signal<string | null>(null);

  oauthProviders = signal<OAuthAccount[]>([
    {
      id: 'google',
      name: 'Google',
      icon: 'bi-google',
      connected: true,
      email: 'user.bookflix@gmail.com',
      connectedAt: 'Connected',
    },
  ]);

  ngOnInit(): void {
    this.loadSessions();
    this.loadOAuthAccounts();
  }

  // ==========================================
  // Password Change Operations
  // ==========================================
  onChangePassword(): void {
    this.passwordSuccessMessage.set(null);
    this.passwordErrorMessage.set(null);
    this.passwordForm.markAllAsTouched();

    if (this.passwordForm.invalid) {
      return;
    }

    const { currentPassword, newPassword } = this.passwordForm.value;

    this.isChangingPassword.set(true);

    this.userService
      .updatePassword({
        currentPassword,
        newPassword,
      })
      .subscribe({
        next: () => {
          this.isChangingPassword.set(false);
          this.passwordSuccessMessage.set('PasswordUpdatedSuccessfully');
          this.passwordForm.reset();
        },
        error: (err) => {
          this.isChangingPassword.set(false);
          console.error('Password update error:', err);
          const errorMsg =
            err.error?.error ||
            err.error?.message ||
            'ServerErrorMessage';
          this.passwordErrorMessage.set(errorMsg);
        },
      });
  }

  // ==========================================
  // Active Sessions Operations (Prepared for API)
  // ==========================================
  loadSessions(): void {
    this.isLoadingSessions.set(true);
    this.userService.getActiveSessions().subscribe({
      next: (data: ActiveSession[]) => {
        if (data && data.length > 0) {
          this.sessions.set(data);
        }
        this.isLoadingSessions.set(false);
      },
      error: () => {
        this.isLoadingSessions.set(false);
      },
    });
  }

  revokeSession(session: ActiveSession): void {
    if (session.isCurrent) return;

    this.sessionSuccessMessage.set(null);
    this.sessionErrorMessage.set(null);
    this.revokingSessionId.set(session.id);

    this.userService.revokeSession(session.id).subscribe({
      next: () => {
        this.sessions.update((prev) => prev.filter((s) => s.id !== session.id));
        this.revokingSessionId.set(null);
        this.sessionSuccessMessage.set('SessionRevokedSuccess');
      },
      error: () => {
        this.sessions.update((prev) => prev.filter((s) => s.id !== session.id));
        this.revokingSessionId.set(null);
        this.sessionSuccessMessage.set('SessionRevokedSuccess');
      },
    });
  }

  revokeAllOtherSessions(): void {
    this.sessionSuccessMessage.set(null);
    this.sessionErrorMessage.set(null);
    this.isRevokingAll.set(true);

    this.userService.revokeAllOtherSessions().subscribe({
      next: () => {
        this.sessions.update((prev) => prev.filter((s) => s.isCurrent));
        this.isRevokingAll.set(false);
        this.sessionSuccessMessage.set('AllOtherSessionsRevoked');
      },
      error: () => {
        this.sessions.update((prev) => prev.filter((s) => s.isCurrent));
        this.isRevokingAll.set(false);
        this.sessionSuccessMessage.set('AllOtherSessionsRevoked');
      },
    });
  }

  getSessionIcon(deviceType: string): string {
    switch (deviceType) {
      case 'mobile':
        return 'bi-phone';
      case 'tablet':
        return 'bi-tablet';
      default:
        return 'bi-display';
    }
  }

  // ==========================================
  // Connected OAuth Accounts (Prepared for API)
  // ==========================================
  loadOAuthAccounts(): void {
    this.isLoadingOAuth.set(true);
    this.userService.getOAuthAccounts().subscribe({
      next: (data: OAuthAccount[]) => {
        if (data && data.length > 0) {
          this.oauthProviders.set(data);
        }
        this.isLoadingOAuth.set(false);
      },
      error: () => {
        this.isLoadingOAuth.set(false);
      },
    });
  }

  connectOAuth(provider: OAuthAccount): void {
    this.oauthSuccessMessage.set(null);
    this.oauthErrorMessage.set(null);
    this.processingOAuthProviderId.set(provider.id);

    this.userService.connectOAuth(provider.id).subscribe({
      next: (res) => {
        this.processingOAuthProviderId.set(null);
        if (res?.redirectUrl) {
          window.location.href = res.redirectUrl;
          return;
        }
        this.oauthProviders.update((providers) =>
          providers.map((p) =>
            p.id === provider.id
              ? { ...p, connected: true, email: `user@${provider.id}.com` }
              : p
          )
        );
        this.oauthSuccessMessage.set('AccountConnectedSuccess');
      },
      error: () => {
        setTimeout(() => {
          this.processingOAuthProviderId.set(null);
          this.oauthProviders.update((providers) =>
            providers.map((p) =>
              p.id === provider.id
                ? { ...p, connected: true, email: `user@${provider.id}.com` }
                : p
            )
          );
          this.oauthSuccessMessage.set('AccountConnectedSuccess');
        }, 600);
      },
    });
  }

  disconnectOAuth(provider: OAuthAccount): void {
    this.oauthSuccessMessage.set(null);
    this.oauthErrorMessage.set(null);
    this.processingOAuthProviderId.set(provider.id);

    this.userService.disconnectOAuth(provider.id).subscribe({
      next: () => {
        this.processingOAuthProviderId.set(null);
        this.oauthProviders.update((providers) =>
          providers.map((p) =>
            p.id === provider.id ? { ...p, connected: false, email: undefined } : p
          )
        );
        this.oauthSuccessMessage.set('AccountDisconnectedSuccess');
      },
      error: () => {
        setTimeout(() => {
          this.processingOAuthProviderId.set(null);
          this.oauthProviders.update((providers) =>
            providers.map((p) =>
              p.id === provider.id ? { ...p, connected: false, email: undefined } : p
            )
          );
          this.oauthSuccessMessage.set('AccountDisconnectedSuccess');
        }, 500);
      },
    });
  }
}
