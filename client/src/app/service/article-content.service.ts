import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ArticleContentService {
    constructor(private http: HttpClient){}
    getContent(data){
        return this.http.post('http://localhost:9000/getContent', data);
    }
}