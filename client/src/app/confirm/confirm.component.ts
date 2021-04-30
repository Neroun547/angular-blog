import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  paramUrl:string;
  loading:boolean;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.params.subscribe(params => { this.paramUrl = params['item'], this.loading = false });
  }

}
