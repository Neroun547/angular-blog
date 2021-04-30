import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmSuccessPasswordComponent } from './confirm-success-password.component';

describe('ConfirmSuccessPasswordComponent', () => {
  let component: ConfirmSuccessPasswordComponent;
  let fixture: ComponentFixture<ConfirmSuccessPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmSuccessPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmSuccessPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
