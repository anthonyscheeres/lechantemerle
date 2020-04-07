import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSubComponent } from './contact-sub.component';

describe('ContactSubComponent', () => {
  let component: ContactSubComponent;
  let fixture: ComponentFixture<ContactSubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactSubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
