import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginData } from '../interfaces/loginData.interface';
import { RegisterData } from '../interfaces/registerData.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) { }

  login(loginData: LoginData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, loginData);
  }

  register(registerData: RegisterData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, registerData);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
