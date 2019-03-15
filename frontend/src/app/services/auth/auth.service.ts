//@Packages
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

//@Services
import { AppConfig } from '../../shared/app-config';
import { HttpService } from '../http.service';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

  private apiUrl: string;
  constructor(public router: Router,
    private _api: AppConfig,
    private _httpService: HttpService,
    private _storageService: StorageService) {

    if (this.tokenValid) {
      this.setLoggedIn(true);
    } else {
      this.logout();      
    }

    this.apiUrl = _api.ServerWithApiUrl;
  }

  login(credentials) {
    const self = this;

    return self._httpService.post(`${self.apiUrl}authenticate`, credentials, { headers: self._api.getHeaders() })
      .pipe(
        map((response: any) => {
          return response;
        }), catchError((errorRes: any) => {
          return self._httpService.handleError(errorRes);
        })
      );
  }

  setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  setSession(authResult) {
    // Set tokens and expiration in localStorage and props
    this._storageService.setCredentials(authResult);

    // Update login status in loggedIn$ stream
    this.setLoggedIn(true);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(this._storageService.getTokenExpireAt());    
    return new Date().getTime() < expiresAt;
  }

  get tokenValid(): boolean {
    // Check if current time is past access token's expiration
    const expiresAt = JSON.parse(this._storageService.getTokenExpireAt());
    return Date.now() < expiresAt;    
  }

  logout() {
    // Ensure all auth items removed from localStorage
    this._storageService.clearCredentials();

    // Reset local properties, update loggedIn$ stream    
    this.setLoggedIn(false);

    // Return to login
    this.router.navigate(['/login']);
  }
}
