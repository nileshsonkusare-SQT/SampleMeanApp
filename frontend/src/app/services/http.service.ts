//@Packages
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  get(url: string, httpOptions?: any): Observable<any> {
    return this._http.get(url, httpOptions);
  }

  post(url: string, body: string, httpOptions?: any): Observable<any> {
    return this._http.post(url, body, httpOptions);
  }

  put(url: string, body: string, httpOptions?: any): Observable<any> {
    return this._http.put(url, body, httpOptions);
  }

  delete(url: string, httpOptions?: any): Observable<any> {
    return this._http.delete(url, httpOptions);
  }

  request(url: string, httpOptions?: any): Observable<any> {
    return this._http.request(url, httpOptions);
  }

  handleError(error: HttpErrorResponse | any) {
    let errorMessage: any;
    if (error instanceof HttpErrorResponse) {      
      if (error.status !== 0) {
        try {
          const response = error.error || '';
          if (typeof response == 'object') {
            errorMessage = { field: 'custom', message: response.message };
          } else {
            errorMessage = { field: 'custom', message: 'Oops! Something went wrong, please try again!' };
          }
        } catch (exception) {
          errorMessage = { field: 'custom', message: 'Oops! Something went wrong, please try again!' };
        }
      } else {
        errorMessage = { field: 'custom', message: 'Oops! Something went wrong, please try again!' };
      }
    } else {
      errorMessage = { field: 'custom', message: 'Oops! Something went wrong, please try again!' };
    }
    return throwError(errorMessage);
  }

   extractData(res: Response) {
    let body = res;
    return body || { };
  }
}