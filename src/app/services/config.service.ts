import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private config: any;

  constructor(private http: HttpClient) {}

  loadConfig(): Promise<any> {
    return this.http.get('/assets/config/config.json')
      .toPromise()
      .then(config => {
        this.config = config;
      })
      .catch((error: any) => {
        console.error('Could not load config.json:', error);
        return Promise.resolve();
      });
  }

  getConfig() {
    return this.config;
  }

  get(key: string) {
    return this.config ? this.config[key] : null;
  }
}
