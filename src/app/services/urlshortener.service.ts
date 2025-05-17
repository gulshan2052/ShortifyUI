import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UrlData } from '../interfaces/urlData.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UrlshortenerService {

  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient, private authService: AuthService) { }

  shorten(urlData: UrlData): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.baseUrl}/shorten`, urlData, { headers });
  }

}
