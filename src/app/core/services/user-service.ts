import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { User } from '../models/User/user.model';
import { Observable } from 'rxjs';
import { ActiveSession, ChangePasswordRequest, OAuthAccount } from '../models/security/security.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) {}

  getUserProfile(): Observable<User> {
    return this.apiService.get<User>('/Users/profile');
  }

  updatePassword(passwordData: ChangePasswordRequest | any): Observable<void> {
    return this.apiService.put<void>('/Users/password', passwordData);
  }

  updateUsername(usernameData: any): Observable<User> {
    return this.apiService.put<User>('/Users/username', usernameData);
  }

  updateEmail(emailData: any): Observable<User> {
    return this.apiService.put<User>('/Users/email', emailData);
  }

  getUserProfileImage(): Observable<Blob> {
    return this.apiService.get<Blob>('/Users/ProfileImage', { responseType: 'blob' });
  }

  uploadProfileImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.apiService.put<any>('/Users/ProfileImage', formData);
  }

  // Prepared endpoints for security features
  getActiveSessions(): Observable<ActiveSession[]> {
    return this.apiService.get<ActiveSession[]>('/Users/sessions');
  }

  revokeSession(sessionId: string): Observable<void> {
    return this.apiService.delete<void>(`/Users/sessions/${sessionId}`);
  }

  revokeAllOtherSessions(): Observable<void> {
    return this.apiService.post<void>('/Users/sessions/revoke-all-others', {});
  }

  getOAuthAccounts(): Observable<OAuthAccount[]> {
    return this.apiService.get<OAuthAccount[]>('/Users/oauth-accounts');
  }

  connectOAuth(provider: string): Observable<{ redirectUrl?: string; success?: boolean }> {
    return this.apiService.post<{ redirectUrl?: string; success?: boolean }>(`/Users/oauth/${provider}/connect`, {});
  }

  disconnectOAuth(provider: string): Observable<void> {
    return this.apiService.delete<void>(`/Users/oauth/${provider}`);
  }
}
