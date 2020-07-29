import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuidditchLeaguesComponent } from './quidditch-leagues.component';

describe('QuidditchLeaguesComponent', () => {
  let component: QuidditchLeaguesComponent;
  let fixture: ComponentFixture<QuidditchLeaguesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuidditchLeaguesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuidditchLeaguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
