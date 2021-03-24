import { Component, OnInit } from '@angular/core';
import { CheckTokenService } from '../service/check-token.service';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { AddArticleService } from '../service/add-article.service';
@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {
  constructor(private serviceToken: CheckTokenService, private serviceAddArtivle: AddArticleService) { }
  error;
  response;
  addArticleForm = new FormGroup({
    "title": new FormControl('', [Validators.required, this.titleValidator]),
    "theme": new FormControl('', [Validators.required, this.themeValidator]),
    "content":new FormControl('', [Validators.required, this.contentValidator]),
    "avtor":new FormControl('', [Validators.required, this.avtorValidator])
  })
  ngOnInit(): void {
    this.serviceToken.checkToken(JSON.parse(localStorage.getItem('token')))
    .subscribe(data => {}, err => this.error = err.error.message);
  }

  contentValidator(control: FormControl){
    if(control.value?.length > 9){
      return null
    } else {
      return {"content": true};
    }
  }

  titleValidator(control: FormControl){
    if(control.value?.length > 30){
      return {"title": true};
    } else {
      return null;
    }
  }

  themeValidator(control: FormControl){
    if(control.value?.length > 30){
      return {"theme": true};
    } else {
      return null;
    }
  }

  avtorValidator(control: FormControl){
    if(control.value?.length > 29){
      return { "avtor":true };
    } else {
      return null;
    }
  }

  submit(){
    this.serviceAddArtivle.addArticle({
      avtor:this.addArticleForm.value.avtor,
      title:this.addArticleForm.value.title,
      content:this.addArticleForm.value.content,
      theme:this.addArticleForm.value.theme
    }).subscribe(data => {
      this.response = data;
      this.addArticleForm.reset('');
    }, err => { 
      this.error = err.error.message;
      this.addArticleForm.reset('');
    });
  }
}
