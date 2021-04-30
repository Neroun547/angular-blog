import { Component, OnInit } from '@angular/core';
import { AccountSettingsService } from '../service/account-settings.service';
import { CheckTokenService } from '../service/check-token.service';
@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
  user: object;
  error: string;
  images;
  loading = false;
  constructor(private accountSettingsService: AccountSettingsService, private checkToken: CheckTokenService) { }

  ngOnInit(): void {
      this.checkToken.checkToken(JSON.parse(localStorage.getItem('token')))
        .subscribe((): void => { 
          this.accountSettingsService
          .getUserInfo('http://localhost:9000/getUserInfo')
          .subscribe(data => this.user = data, err => this.error = err.message);
        });
  }
  selectImage(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  onSubmit(): void {
    this.loading = true;
    const formData = new FormData();
    formData.append('filedata', this.images);
    this.accountSettingsService.changeAvatar(formData)
    .subscribe(res => (location.reload(), this.loading = false),
    err => (this.error = err.error.message, this.loading = false));
  }
} 
