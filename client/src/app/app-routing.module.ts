import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Component
import { MainComponent } from './main/main.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { ArticleComponent } from './article/article.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ChangeItemComponent } from './change-item/change-item.component'; 
import { ChangeCheckComponent } from './change-check/change-check.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ConfirmSuccessComponent } from './confirm-success-email/confirm-success-email.component';
import { ConfirmSuccessPasswordComponent } from './confirm-success-password/confirm-success-password.component';  

const routes: Routes = [
  {path: "", component:MainComponent},
  {path: "login", component: LoginComponent},
  {path:"register", component: RegisterComponent},
  {path:"add-article", component:AddArticleComponent},
  {path: 'article/:number/item/:id', component:ArticleComponent},
  {path:'account-settings', component: AccountSettingsComponent},
  {path:'account-settings/checkpassword/:change', component:ChangeCheckComponent},
  {path:"account-settings/change/:change", component: ChangeItemComponent},
  {path:"article/:number", component:ArticleListComponent},
  {path:"confirm/:item", component:ConfirmComponent},
  {path:"new-email/:hash", component:ConfirmSuccessComponent},
  {path:"new-password/:hash", component:ConfirmSuccessPasswordComponent},
  {path: "**", component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
