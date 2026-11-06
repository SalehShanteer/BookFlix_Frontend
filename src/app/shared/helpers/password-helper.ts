export class PasswordHelper {
  public static IsStrongPassword(password: string): boolean {
    if (password.length < 8) return false;
    let hasUpper: boolean = false,
      hasLower: boolean = false,
      hasDigit: boolean = false,
      hasSpecial: boolean = false;

    for (const c of password) {
      if (/[A-Z]/.test(c)) hasUpper = true;
      else if (/[a-z]/.test(c)) hasLower = true;
      else if (/[0-9]/.test(c)) hasDigit = true;
      else hasSpecial = true;

      if (hasUpper && hasLower && hasDigit && hasSpecial) {
        return true;
      }
    }

    return false;
  }

  public static getPasswordStrength(password: string): {
    score: number;
    label: string;
    color: string;
  } {
    if (!password || password.length === 0) {
      return { score: 0, label: '', color: 'var(--bf-text-muted)' };
    }

    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const colors = [
      'var(--bf-danger)',
      'var(--bf-danger)',
      '#f59e0b',
      'var(--bf-success)',
      'var(--bf-success)',
    ];
    const labels = ['TooWeak', 'TooWeak', 'Weak', 'Fair', 'Strong'];

    return {
      score,
      label: labels[score] ?? 'Strong',
      color: colors[score] ?? 'var(--bf-success)',
    };
  }
}
