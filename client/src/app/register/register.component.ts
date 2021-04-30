import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../service/register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private service: RegisterService, private router: Router) { }
  response;
  error: string;
  registerForm = new FormGroup({
    'name': new FormControl('', [Validators.required, this.nameValidator]),
    'username': new FormControl('', [Validators.required, this.userNameValidator]), 
    'email': new FormControl('', [Validators.required, Validators.email]),
    'phone': new FormControl('', [Validators.required, this.phoneValidator]),
    'password': new FormControl('', [Validators.required ])
  });

  nameValidator(control: FormControl): null | object {
    if (control.value?.length < 30 && control.value?.length > 0){
      return null;
    } else {
      return { 'name': true };
    }
  }
  userNameValidator(control: FormControl): null | object {
    if (control.value?.length < 30 && control.value?.length > 3){
      return null;
    } else {
      return { 'username': true };
    }
  }
  phoneValidator(control: FormControl): null | object {
    if (Number(control.value)) {
      return null;
    } else {
      return { 'phone': true };
    }
  }
  passwordValidator(control: FormControl): null | object {
    if (control.value?.length > 6 && control.value.length < 30){
      return null;
    } else {
      return { 'password': true };
    }
  }
  submit(): void {
    this.error = '';
    if (this.registerForm.status === 'VALID') {
      this.service.checkRegister({
        name: this.registerForm.value.name,
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        phone: this.registerForm.value.phone,
        password: this.registerForm.value.password
      }).subscribe(data => (  
        this.registerForm.reset(''),
        this.router.navigate(['/login']) 
      ), err => (
        this.error = err.error.message,
        this.registerForm.reset('')
      )
    );
  }
}
}
