import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmSuccessEmailComponent } from './confirm-success-email.component';

describe('ConfirmSuccessEmailComponent', () => {
  let component: ConfirmSuccessEmailComponent;
  let fixture: ComponentFixture<ConfirmSuccessEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmSuccessEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmSuccessEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
