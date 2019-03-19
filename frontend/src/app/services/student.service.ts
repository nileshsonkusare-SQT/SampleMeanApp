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
export class StudentService {
  private apiUrl: string;

  constructor(private _api: AppConfig,
    private _httpService: HttpService) {
    this.apiUrl = this._api.ServerWithApiUrl;
  }

  getStudents(filtertext:string, page:number , pagesize: number) {
    return this._httpService.get(`${this.apiUrl}student/GetAll?filtertext=${filtertext}&page=${page}&pagesize=${pagesize}`, { headers: this._api.getHeaders() })
      .pipe(
        map((response: Response) => {          
          return this._httpService.extractData(response);
        }), catchError((errorRes: any) => {
          return this._httpService.handleError(errorRes);
        })
      )
  }

  getStudentById(id) {
    return this._httpService.get(`${this.apiUrl}student/${id}`, { headers: this._api.getHeaders() })
      .pipe(
        map((response: Response) => {
          return this._httpService.extractData(response);
        }), catchError((errorRes: any) => {
          return this._httpService.handleError(errorRes);
        })
      )
  }

  createStudent(student) {
    return this._httpService.post(`${this.apiUrl}student`, student, { headers: this._api.getHeaders() })
      .pipe(
        map((response: any) => {
          return this._httpService.extractData(response);
        }), catchError((errorRes: any) => {          
          return this._httpService.handleError(errorRes);
        })
      );
  }

  updateStudent(student) {
    return this._httpService.put(`${this.apiUrl}student`, student, { headers: this._api.getHeaders() })
      .pipe(
        map((response: any) => {
          return this._httpService.extractData(response);
        }), catchError((errorRes: any) => {
          return this._httpService.handleError(errorRes);
        })
      );
  }

  deleteStudent(id) {
    return this._httpService.delete(`${this.apiUrl}student/${id}`, { headers: this._api.getHeaders() })
      .pipe(
        map((response: any) => {
          return this._httpService.extractData(response);
        }), catchError((errorRes: any) => {
          return this._httpService.handleError(errorRes);
        })
      );
  }

  dummyStudents() {
    return this._httpService.post(`${this.apiUrl}student/DummyStudents`, null, { headers: this._api.getHeaders() })
      .pipe(
        map((response: any) => {
          return this._httpService.extractData(response);
        }), catchError((errorRes: any) => {          
          return this._httpService.handleError(errorRes);
        })
      );
  }

}
