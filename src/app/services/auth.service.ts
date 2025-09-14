import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginData } from '../interfaces/loginData.interface';
import { RegisterData } from '../interfaces/registerData.interface';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiBaseUrl;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiBaseUrl = this.configService.get('baseUrl') + this.configService.get('apiPath');
  }

  login(loginData: LoginData): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/auth/login`, loginData);
  }

  register(registerData: RegisterData): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/auth/register`, registerData);
  }

  getToken(): string {
    const token = localStorage.getItem('token');
    if (token) return token;
    return "";
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
