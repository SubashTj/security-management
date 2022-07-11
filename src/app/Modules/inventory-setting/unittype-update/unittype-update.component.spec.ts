import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnittypeUpdateComponent } from './unittype-update.component';

describe('UnittypeUpdateComponent', () => {
  let component: UnittypeUpdateComponent;
  let fixture: ComponentFixture<UnittypeUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnittypeUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnittypeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
