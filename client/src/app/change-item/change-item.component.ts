import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';  
import { ActivatedRoute, Router } from '@angular/router';
import { AccountSettingsService } from '../service/account-settings.service';
@Component({
  selector: 'app-change-item',
  templateUrl: './change-item.component.html',
  styleUrls: ['./change-item.component.scss']
})
export class ChangeItemComponent implements OnInit {
  error;
  message;
  check;
  paramUrl;
  placholder:string;
  changeUserNameForm = new FormGroup({
    'newparam':new FormControl('', [Validators.required])
  })
  constructor(private acountSettingsService:AccountSettingsService,
    private activatedRoute: ActivatedRoute,
    private router: Router 
  ) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['change'] === 'username' || params['change'] === 'name'
       || params['change'] === 'phone' || params['change'] === 'email'
       || params['change'] === 'password'){
        this.paramUrl = params['change']
      } else {
        this.error = 'Ошибка';
      }
    });
    this.acountSettingsService.checkActiveChange().subscribe((data) => {
      this.check = data['check'];
    }, err => {
      this.error = err.error.message;
    })
  }

  submitForm(){
    this.error = '';
    if(this.paramUrl === 'email'){
      this.acountSettingsService.changeParam({newparam:this.changeUserNameForm.value.newparam,
        change:this.paramUrl}).subscribe((data) => {
          this.message = data['message'];
          this.changeUserNameForm.reset('');
          this.router.navigate(['confirm/email'])
        }, err => {
        this.error = err.error.message;
        this.changeUserNameForm.reset('');
     })      
    }
    if(this.paramUrl === 'password'){
      this.acountSettingsService.changeParam({newparam:this.changeUserNameForm.value.newparam,
        change:this.paramUrl}).subscribe((data) => {
          this.message = data['message'];
          this.changeUserNameForm.reset('');
          this.router.navigate(['confirm/password'])
        }, err => {
        this.error = err.error.message;
        this.changeUserNameForm.reset('');
     })      
    } else {
      this.acountSettingsService.changeParam({newparam:this.changeUserNameForm.value.newparam,
           change:this.paramUrl}).subscribe((data) => {
          this.message = data['message'];
          this.changeUserNameForm.reset('');
      }, err => {
        this.error = err.error.message;
        this.changeUserNameForm.reset('');
      })
      }
    }
}