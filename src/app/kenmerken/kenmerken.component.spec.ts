import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KenmerkenComponent } from './kenmerken.component';

describe('KenmerkenComponent', () => {
  let component: KenmerkenComponent;
  let fixture: ComponentFixture<KenmerkenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KenmerkenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KenmerkenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
