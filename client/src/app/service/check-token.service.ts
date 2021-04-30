import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class CheckTokenService {
    constructor(private http: HttpClient){}

    checkToken(token: string): Observable<any> {
        return this.http.post('http://localhost:9000/checkToken', token);
    }
}
