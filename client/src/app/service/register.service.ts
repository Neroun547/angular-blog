import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
    export class RegisterService {
        constructor(private http: HttpClient){}

        checkRegister(data){
            return this.http.post('http://localhost:9000/register', data);
        }
    } 