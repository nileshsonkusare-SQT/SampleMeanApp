//@Packages
import { Injectable } from '@angular/core';
import { HttpHeaders} from '@angular/common/http';

@Injectable()
export class AppConfig {
    public ServerPath: string = "http://localhost:3000/";           
    public ApiUrl: string = "api/";
    public ServerWithApiUrl = this.ServerPath + this.ApiUrl;
    public setAuthHeader(headers: HttpHeaders) {     
        headers.append('Content-Type', 'application/json');         
        headers.append('x-access-token', localStorage.getItem('access_token'));
    }

    public getHeaders() {     
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return headers;
    }
}