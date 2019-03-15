import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public change: EventEmitter<string> = new EventEmitter();

  setCredentials(authResult: any): void {
    // Save session data and update login status subject
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + Date.now());

    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('profile', JSON.stringify(authResult.data));
  }

  set(token: string): void {
    localStorage.setItem('access_token', token);
  }

  setProfileImg(profileImgLink: string) {
    localStorage.setItem('currentImg', profileImgLink);
    this.change.emit('currentImg');
  }

  getTokenExpireAt(): string {    
    return localStorage.getItem('expires_at');
  }
  getToken(): string {
    return localStorage.getItem('access_token');
  }
  getUser(): string {
    return localStorage.getItem('profile');
  }
  getUserProfile(): any {
    if (localStorage.getItem("profile")) {
      return JSON.parse(localStorage.getItem("profile"));
    }
    return null;
  }

  getUserProfileId(): number {
    let profileObj = this.getUserProfile();
    if (profileObj != null && profileObj != undefined) {
      return profileObj._id;
    }
    return 0;
  }

  getUserName(): string {
    let profileObj = this.getUserProfile();
    if (profileObj != null && profileObj != undefined) {
      return profileObj.name;
    }
    return "";
  }

  getUserEmail(): string {
    let profileObj = this.getUserProfile();
    if (profileObj != null && profileObj != undefined) {
      return profileObj.email;
    }
    return "";
  }


  clearCredentials(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
    localStorage.removeItem('currentImg');
  }

}
