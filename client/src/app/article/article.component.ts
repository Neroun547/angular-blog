import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleContentService } from '../service/article-content.service';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  id;
  content;
  constructor(private route: ActivatedRoute, private service: ArticleContentService){
  }
  ngOnInit():void{
    this.id = this.route.snapshot.params['id'];
    this.service.getContent({id:this.id}).subscribe(data => {
      this.content = data;
    })
  }
}
