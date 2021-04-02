import { Component, DoCheck, OnInit } from '@angular/core';  
import { AppService } from './service/app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck, OnInit {
  title = 'app-angular';
  activeUser = false;
  srcAvatar;
  constructor(private service: AppService){}
  ngDoCheck(){
    if(localStorage.getItem('token')){
      this.activeUser = true;
    } else {
      this.activeUser = false;
    }
  }

  ngOnInit(){ 
    if(localStorage.getItem('token')){
      this.service.getImage('http://localhost:9000/getAvatar').subscribe(x => this.srcAvatar = x)
    }
  }

  exitAccount(){
    localStorage.removeItem('token');
    location.reload();
  }
}
