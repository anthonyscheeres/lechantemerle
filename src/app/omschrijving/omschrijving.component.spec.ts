import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OmschrijvingComponent } from './omschrijving.component';

describe('OmschrijvingComponent', () => {
  let component: OmschrijvingComponent;
  let fixture: ComponentFixture<OmschrijvingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmschrijvingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmschrijvingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
