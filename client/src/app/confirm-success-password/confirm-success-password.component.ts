import { Component, OnInit } from '@angular/core';
import { AccountSettingsService } from '../service/account-settings.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-success-password',
  templateUrl: './confirm-success-password.component.html',
  styleUrls: ['./confirm-success-password.component.scss']
})
export class ConfirmSuccessPasswordComponent implements OnInit {
  message: string;
  error: string;
  loading: boolean;
  constructor(
    private service: AccountSettingsService,
    private activatedRoute: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.params.subscribe(params => {
      this.service.confirmSuccess('http://localhost:9000/confirm-password', { hash: params.hash })
      .subscribe(data => (this.message = data['message'], this.loading = false),
       err => ( this.error = err.error.message, this.loading = false )
      );
    });
  }
}
