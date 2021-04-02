//Module
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//Component
import { AppComponent } from './app.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { ArticleComponent } from './article/article.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ChangeCheckComponent } from './change-check/change-check.component';
import { ChangeItemComponent } from './change-item/change-item.component'; 
//Service
import { LoginService } from './service/login.service';
import { RegisterService } from './service/register.service';
import { CheckTokenService } from './service/check-token.service';
import { ArticleService } from './service/articel.service';
import { AccountSettingsService } from './service/account-settings.service'; 
import { AppService } from './service/app.service'; 
//Sait effect
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    ArticleListComponent,
    AddArticleComponent,
    ArticleComponent,
    AccountSettingsComponent,
    ChangeCheckComponent,
    ChangeItemComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [LoginService, RegisterService, CheckTokenService, 
    ArticleService,
     AccountSettingsService, AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
