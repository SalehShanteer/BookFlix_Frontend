import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, options?: { headers?: any; params?: any; responseType?: any }): Observable<T> {
    return this.http.get(`${this.baseUrl}${endpoint}`, options as any).pipe(
      catchError(this.handleError)
    ) as any;
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body).pipe(catchError(this.handleError));
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body).pipe(catchError(this.handleError));
  }

  private handleError(err: any) {
    console.error('API Error:', err);
    return throwError(() => err);
  }
}
