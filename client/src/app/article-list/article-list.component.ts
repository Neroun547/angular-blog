import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../service/articel.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articleList;
  error;
  articleUrl;
  loadingNextArticles = false;
  formSearchTheme = {
    titleSearchTheme: ''
  };
  countArticle: number;

  constructor(private articleService: ArticleService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  this.activatedRoute.params.subscribe(params => {
    this.articleUrl = Number(params.number);
    this.articleService.getArticelList(params.number)
      .subscribe(data => {
        this.error = null;
        this.articleList = data.listArticle;
        this.countArticle = Number(data.countArticle) / this.articleUrl;
        this.loadingNextArticles = false;
      }, err => {
        this.error = err.error.message;
        this.loadingNextArticles = false;
      });
    }, err => {
      this.error = 'Ошибка';
      this.loadingNextArticles = false;
    });
  }

  submitSearch(form): void {
    this.loadingNextArticles = true;
    this.articleService.searchArticlesTheme(form.value.titleSearchTheme.trim()).subscribe(data => {
      this.articleList = data;
      this.formSearchTheme.titleSearchTheme = '';
      this.loadingNextArticles = false;
    }, err => {
      this.error = err.error.message;
      this.loadingNextArticles = false;
    });
  }

  loader(): void {
    this.loadingNextArticles = true;
  }

}
