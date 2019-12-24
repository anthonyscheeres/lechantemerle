import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndelingComponent } from './indeling.component';

describe('IndelingComponent', () => {
  let component: IndelingComponent;
  let fixture: ComponentFixture<IndelingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndelingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndelingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
