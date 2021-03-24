import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class CheckTokenService {
    constructor(private http: HttpClient){}

    checkToken(token:string){
        return this.http.post('http://localhost:9000/checkToken', token);
    }
}