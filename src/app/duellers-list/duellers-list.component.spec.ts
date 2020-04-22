import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuellersListComponent } from './duellers-list.component';

describe('DuellersListComponent', () => {
  let component: DuellersListComponent;
  let fixture: ComponentFixture<DuellersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuellersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuellersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
