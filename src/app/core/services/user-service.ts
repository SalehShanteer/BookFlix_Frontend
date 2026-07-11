import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { User } from '../models/User/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) {}

  getUserProfile(): Observable<User> {
    return this.apiService.get<User>('/Users/profile');
  }

  updatePassword(passwordData: any): Observable<void> {
    return this.apiService.put<void>('/Users/password', passwordData);
  }

  updateUsername(usernameData: any): Observable<User> {
    return this.apiService.put<User>('/Users/username', usernameData);
  }

  updateEmail(emailData: any): Observable<User> {
    return this.apiService.put<User>('/Users/email', emailData);
  }

  getUserProfileImage(): Observable<Blob> {
    return this.apiService.get<Blob>('/Users/ProfileImage');
  }

  uploadProfileImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.apiService.put<any>('/Users/ProfileImage', formData);
  }
}
