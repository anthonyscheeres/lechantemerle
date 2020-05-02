import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPageRoomsComponent } from './detail-page-rooms.component';

describe('DetailPageRoomsComponent', () => {
  let component: DetailPageRoomsComponent;
  let fixture: ComponentFixture<DetailPageRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPageRoomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPageRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
