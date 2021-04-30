import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
    export class AccountSettingsService {

        constructor(private http: HttpClient){}

        getUserInfo(url: string): Observable<any> {
            return this.http.get(url);
        }

        checkPassword(url: string, passwordIn: string): Observable<any> {
            return this.http.post(url, {password: passwordIn });
        }

        checkActiveChange(): Observable<any>  {
            return this.http.get('http://localhost:9000/activeChange');
        }

        changeParam(data): Observable<any> {
            return this.http.post('http://localhost:9000/changeParam', data);
        }

        changeAvatar(formData): Observable<any> {
            return this.http.post<any>('http://localhost:9000/addAvatar', formData);
        }

        confirmSuccess(url: string, hashData): Observable<any> {
            return this.http.post(url, hashData);
        }
}
