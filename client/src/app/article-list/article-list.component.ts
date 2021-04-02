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
  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getArticelList().subscribe(data => {this.articleList = data;}, err => {
      this.error = err;
    });
  }

}
