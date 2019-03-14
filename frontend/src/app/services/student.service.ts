//@Packages
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

//@Constant
import { CONFIG } from '../shared/CONFIG';

//@Services
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl: string;

  constructor(private _api: CONFIG,
    private _httpService: HttpService) {
    this.apiUrl = this._api.ServerWithApiUrl;
  }

  getStudents() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this._api.setAuthHeader(headers);

    return this._httpService.get(`${this.apiUrl}student/GetAll`, { headers: headers })
      .pipe(
        map((response: Response) => {          
          return this._httpService.extractData(response);
        }), catchError((errorRes: any) => {
          return this._httpService.handleError(errorRes);
        })
      )
  }

  getStudentById(id) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this._api.setAuthHeader(headers);

    return this._httpService.get(`${this.apiUrl}student/${id}`, { headers: headers })
      .pipe(
        map((response: Response) => {
          return this._httpService.extractData(response);
        }), catchError((errorRes: any) => {
          return this._httpService.handleError(errorRes);
        })
      )
  }

  createStudent(student) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this._api.setAuthHeader(headers);   

    return this._httpService.post(`${this.apiUrl}student`, student, { headers: headers })
      .pipe(
        map((response: any) => {
          return this._httpService.extractData(response);
        }), catchError((errorRes: any) => {          
          return this._httpService.handleError(errorRes);
        })
      );
  }

  updateStudent(student) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this._api.setAuthHeader(headers);

    return this._httpService.put(`${this.apiUrl}student`, student, { headers: headers })
      .pipe(
        map((response: any) => {
          return this._httpService.extractData(response);
        }), catchError((errorRes: any) => {
          return this._httpService.handleError(errorRes);
        })
      );
  }

  deleteStudent(id) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this._api.setAuthHeader(headers);

    return this._httpService.delete(`${this.apiUrl}student/${id}`, { headers: headers })
      .pipe(
        map((response: any) => {
          return this._httpService.extractData(response);
        }), catchError((errorRes: any) => {
          return this._httpService.handleError(errorRes);
        })
      );
  }

}
