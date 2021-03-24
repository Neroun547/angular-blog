import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class GetArticleList {
    constructor(private http: HttpClient){}

    getArticelList(){
        return this.http.get('http://localhost:9000/getArticleList');
    }
}