import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { map } from 'rxjs/operators'
@Injectable()
    export class ArticleService {
    constructor(private http:HttpClient){}

    addArticle(data){
        return this.http.post('http://localhost:9000/addArticle', data);
    }

    getContent(data){
        return this.http.post('http://localhost:9000/getContent', data);
    }

    getArticelList(page){
        return this.http.get(`http://localhost:9000/getArticleList/${page}`).pipe(map(data => {
            const newList = data['message'].map(el => {
                return {
                    _id:el._id,
                    avtor:el.avtor,
                    theme:el.theme.join(' '),
                    title:el.title,
                    content:el.content,
                    date:el.date
                }
            })

            return {
                listArticle: newList,
                countArticle: data['countArticle']
            };
        }));
    }

    searchArticlesTheme(title){
        return this.http.post("http://localhost:9000/searchArticles", {
            theme:title
        }).pipe(map(data => {
            const newList = data['message'].map(el => {
                return {
                    _id:el._id,
                    avtor:el.avtor,
                    theme:el.theme.join(' '),
                    title:el.title,
                    content:el.content,
                    date:el.date
                }
            })
            return newList;
        }))
    }
}