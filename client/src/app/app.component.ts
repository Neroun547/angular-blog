import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {
  title = 'app-angular';
  activeUser = false;
  ngDoCheck(){
    if(localStorage.getItem('token')){
      this.activeUser = true;
    } else {
      this.activeUser = false;
    }
  }
  exitAccount(){
    localStorage.removeItem('token');
    location.reload();
  }
}
