import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../service/articel.service';
@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articleList;
  error;
  formSearchTheme = {
    titleSearchTheme: ''
  }

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getArticelList().subscribe(data => {this.articleList = data, console.log(this.articleList);}, err => {
      this.error = err;
    });
  }

  submitSearch(form){
    this.articleService.searchArticlesTheme(form.value.titleSearchTheme.trim()).subscribe(data => {
      this.articleList = data;
      this.formSearchTheme.titleSearchTheme = '';
    }, err => {
      this.error = err.error.message;
    });
  }

}
