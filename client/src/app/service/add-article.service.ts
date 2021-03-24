import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class AddArticleService {
    constructor(private http: HttpClient){}

    addArticle(data){
        return this.http.post('http://localhost:9000/addArticle', data);
    }
}