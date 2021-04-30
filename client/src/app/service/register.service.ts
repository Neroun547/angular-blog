import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
    export class RegisterService {
        constructor(private http: HttpClient){}

        checkRegister(data): Observable<any> {
            return this.http.post('http://localhost:9000/register', data);
        }
    } 
