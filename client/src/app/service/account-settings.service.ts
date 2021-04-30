import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable()
    export class AccountSettingsService {

        constructor(private http: HttpClient){}

        getUserInfo(url:string){
            return this.http.get(url);
        }
        checkPassword(url:string, password:string){
            return this.http.post(url, {password:password})
        }
        checkActiveChange(){
            return this.http.get('http://localhost:9000/activeChange');
        }
        changeParam(data){
            return this.http.post('http://localhost:9000/changeParam', data);
        }
        changeAvatar(formData){
            return this.http.post<any>('http://localhost:9000/addAvatar', formData)
        }
        confirmSuccess(url:string, hashData){
            return this.http.post(url, hashData);
        }
    }