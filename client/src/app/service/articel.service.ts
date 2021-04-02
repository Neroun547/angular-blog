import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
@Injectable()
    export class ArticleService {
    constructor(private http:HttpClient){}

    addArticle(data){
        return this.http.post('http://localhost:9000/addArticle', data);
    }

    getContent(data){
        return this.http.post('http://localhost:9000/getContent', data);
    }

    getArticelList(){
        return this.http.get('http://localhost:9000/getArticleList');
    }
}