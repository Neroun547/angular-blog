import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';  
import { ActivatedRoute } from '@angular/router';
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
  constructor(private acountSettingsService:AccountSettingsService, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['change'] === 'username' || params['change'] === 'name' || params['change'] === 'phone'){
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