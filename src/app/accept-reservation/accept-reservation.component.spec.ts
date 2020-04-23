import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptReservationComponent } from './accept-reservation.component';

describe('AcceptReservationComponent', () => {
  let component: AcceptReservationComponent;
  let fixture: ComponentFixture<AcceptReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
