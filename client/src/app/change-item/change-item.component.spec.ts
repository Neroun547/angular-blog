import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeItemComponent } from './change-item.component';

describe('ChangeItemComponent', () => {
  let component: ChangeItemComponent;
  let fixture: ComponentFixture<ChangeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
