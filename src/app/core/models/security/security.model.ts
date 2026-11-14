export interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  os: string;
  ipAddress: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
  deviceType: 'desktop' | 'mobile' | 'tablet';
}

export interface OAuthAccount {
  id: 'google' | string;
  name: string;
  icon: string;
  connected: boolean;
  email?: string;
  username?: string;
  connectedAt?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}
