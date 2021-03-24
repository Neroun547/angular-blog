//Module
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//Component
import { AppComponent } from './app.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { ArticleComponent } from './article/article.component';
//Service
import { LoginService } from './service/login.service';
import { RegisterService } from './service/register.service';
import { CheckTokenService } from './service/check-token.service';
import { AddArticleService } from './service/add-article.service';
import { ArticleContentService } from './service/article-content.service';
import { GetArticleList } from './service/get-articlelist.service';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    ArticleListComponent,
    AddArticleComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [LoginService, RegisterService, CheckTokenService, 
    AddArticleService, ArticleContentService, GetArticleList],
  bootstrap: [AppComponent]
})
export class AppModule { }
