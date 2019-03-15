//@Packages
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

//@Constant
import { AppConfig } from '../shared/app-config';

//@Services
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl: string;

  constructor(private _api: AppConfig,
    private _httpService: HttpService) {
    this.apiUrl = this._api.ServerWithApiUrl;
  }

  signup(user) {
    return this._httpService.post(`${this.apiUrl}account/Signup`, user, { headers: this._api.getHeaders() })
      .pipe(
        map((response: any) => {
          return this._httpService.extractData(response);
        }), catchError((errorRes: any) => {          
          return this._httpService.handleError(errorRes);
        })
      );
  }
}
