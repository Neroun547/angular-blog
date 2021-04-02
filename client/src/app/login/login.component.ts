import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
  constructor(private service: LoginService) {}
  token;
  error ;
  loginForm = new FormGroup({
    "email":new FormControl('', [Validators.required, Validators.email]),
    "password":new FormControl('', [Validators.required])
  })

  submit(){
    this.error = '';
    if(this.loginForm.status === 'VALID'){
      this.service.checkLogin({ 
        email:this.loginForm.value.email,
        password:this.loginForm.value.password 
      }).subscribe(data => {
        this.token = data
        console.log(data);
        localStorage.setItem('token', JSON.stringify({token:this.token.token}));
        this.loginForm.reset('');
        window.location.replace('/');
      }, 
        err => {
          this.error = err.error.message;
          this.loginForm.reset('');
        });
    }
  }
}
