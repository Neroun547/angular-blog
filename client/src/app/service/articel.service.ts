import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
    export class ArticleService {
    constructor(
        private http: HttpClient
    ){ }

    addArticle(data): Observable<any> {
        return this.http.post('http://localhost:9000/addArticle', data);
    }

    getContent(data): Observable<any> {
        return this.http.post('http://localhost:9000/getContent', data);
    }

    getArticelList(page): Observable<any> {
        return this.http.get(`http://localhost:9000/getArticleList/${page}`)
        .pipe(
            map(data => {
            const newList = data['message'].map(el => {
                return {
                    _id: el._id,
                    avtor: el.avtor,
                    theme: el.theme.join(' '),
                    title: el.title,
                    content: el.content,
                    date: el.date
                };
            });

            return {
                listArticle: newList,
                countArticle: data['countArticle']
            };
        }));
    }

    searchArticlesTheme(title): Observable<any> {
        return this.http.post('http://localhost:9000/searchArticles', {
            theme: title
        }).pipe(map(data => {
            const newList = data['message'].map(el => {
                return {
                    _id: el._id,
                    avtor: el.avtor,
                    theme: el.theme.join(' '),
                    title: el.title,
                    content: el.content,
                    date: el.date
                };
            });
            return newList;
        }));
    }
}
