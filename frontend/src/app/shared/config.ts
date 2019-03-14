//@Packages
import { Injectable } from '@angular/core';
import { HttpHeaders} from '@angular/common/http';

@Injectable()
export class CONFIG {
    public ServerPath: string = "http://localhost:3000/";           
    public ApiUrl: string = "api/";
    public ServerWithApiUrl = this.ServerPath + this.ApiUrl;
    public setAuthHeader(headers: HttpHeaders) {              
        headers.append('access-token', localStorage.getItem('access_token'));
    }
}