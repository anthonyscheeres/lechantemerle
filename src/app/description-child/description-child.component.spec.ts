import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionChildComponent } from './description-child.component';

describe('DescriptionChildComponent', () => {
  let component: DescriptionChildComponent;
  let fixture: ComponentFixture<DescriptionChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
