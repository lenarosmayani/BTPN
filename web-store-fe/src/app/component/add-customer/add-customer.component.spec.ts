import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerDialogComponent } from './add-customer.component';

describe('AddCustomerComponent', () => {
  let component: AddCustomerDialogComponent;
  let fixture: ComponentFixture<AddCustomerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCustomerDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCustomerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
