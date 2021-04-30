import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { AccountSettingsService } from '../service/account-settings.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-change-check',
  templateUrl: './change-check.component.html',
  styleUrls: ['./change-check.component.scss']
})
export class ChangeCheckComponent implements OnInit {
  change;
  error;
  constructor(
      private activatedRoute: ActivatedRoute,
      private accountSettingsService: AccountSettingsService,
      private router: Router
    ) {

    }

  changeForm = new FormGroup({
    'password': new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.change = params.change);
  }

  submitForm(): void {
    this.accountSettingsService.checkPassword('http://localhost:9000/checkPassword', this.changeForm.value.password)
    .subscribe(() => {
      this.changeForm.reset('');
      this.router.navigate(['account-settings/change/' + this.change]);
    }, err => {
      this.error = err.error.message;
      this.changeForm.reset('');
      console.log(err.message);
      console.log(err);
    });
  }
}
