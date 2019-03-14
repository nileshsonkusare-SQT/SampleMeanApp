//@Packages
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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
          if (response.error.length > 0) {
            errorMessage = response.Errors.map(function (obj) { return { field: obj.FieldName, message: obj.Message }; });
          } else {
            errorMessage = [{ field: 'custom', message: response.Message }];
          }
        } catch (exception) {
          errorMessage = [{ field: 'custom', message: 'Oops! Something went wrong, please try again!' }];
        }
      } else {
        errorMessage = [{ field: 'custom', message: 'Oops! Something went wrong, please try again!' }];
      }
    } else {
      errorMessage = [{ field: 'custom', message: 'Oops! Something went wrong, please try again!' }];
    }
    return Observable.throw(errorMessage);
  }

   extractData(res: Response) {
    let body = res;
    return body || { };
  }
}