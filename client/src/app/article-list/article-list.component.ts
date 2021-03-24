import { Component, OnInit } from '@angular/core';
import { GetArticleList } from '../service/get-articlelist.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articleList;
  error;
  constructor(private serivce: GetArticleList) { }

  ngOnInit(): void {
    this.serivce.getArticelList().subscribe(data => {this.articleList = data;}, err => {
      this.error = err;
    });
  }

}
