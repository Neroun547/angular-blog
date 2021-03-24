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
const routes: Routes = [
  {path: "", component:MainComponent},
  {path: "login", component: LoginComponent},
  {path:"register", component: RegisterComponent},
  {path:'article', component: ArticleListComponent},
  {path:"add-article", component:AddArticleComponent},
  {path: 'article/item/:id', component:ArticleComponent },
  {path: "**", component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
