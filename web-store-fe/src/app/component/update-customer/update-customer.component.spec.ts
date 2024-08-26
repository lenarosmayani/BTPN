import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCustomerDialogComponent } from './update-customer.component';

describe('UpdateCustomerComponent', () => {
  let component: UpdateCustomerDialogComponent;
  let fixture: ComponentFixture<UpdateCustomerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCustomerDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCustomerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
