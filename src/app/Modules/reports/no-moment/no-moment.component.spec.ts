import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoMomentComponent } from './no-moment.component';

describe('NoMomentComponent', () => {
  let component: NoMomentComponent;
  let fixture: ComponentFixture<NoMomentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoMomentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoMomentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
