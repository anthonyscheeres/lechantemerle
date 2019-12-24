import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuisComponent } from './huis.component';

describe('HuisComponent', () => {
  let component: HuisComponent;
  let fixture: ComponentFixture<HuisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
