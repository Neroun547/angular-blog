import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCheckComponent } from './change-check.component';

describe('ChangeCheckComponent', () => {
  let component: ChangeCheckComponent;
  let fixture: ComponentFixture<ChangeCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
