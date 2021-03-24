import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
    export class LoginService {
        constructor(private http: HttpClient){}

        checkLogin(data){
           return this.http.post('http://localhost:9000/login', data);
        }
    }