import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPendingReservationComponent } from './add-pending-reservation.component';

describe('AddPendingReservationComponent', () => {
  let component: AddPendingReservationComponent;
  let fixture: ComponentFixture<AddPendingReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPendingReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPendingReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
