import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../service/articel.service';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  id;
  content;
  constructor(private route: ActivatedRoute, private articleService: ArticleService){
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.articleService.getContent({id: this.id})
    .subscribe(data => {
      this.content = data;
    });
  }
}
