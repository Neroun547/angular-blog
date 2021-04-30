import { Component, OnInit } from '@angular/core';
import { AccountSettingsService } from '../service/account-settings.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-success',
  templateUrl: './confirm-success-email.component.html',
  styleUrls: ['./confirm-success-email.component.scss']
})
export class ConfirmSuccessComponent implements OnInit {
  message:string;
  error:string;
  loading:boolean;
  constructor(private service:AccountSettingsService, private activatedRoute:ActivatedRoute) { }
  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.params.subscribe(params => {
      this.service.confirmSuccess("http://localhost:9000/confirm-email", { hash:params['hash'] })
      .subscribe(data => { this.message = data['message'], this.loading = false },
       err => { this.error = err.error.message, this.loading = false });
    });
  }

}
