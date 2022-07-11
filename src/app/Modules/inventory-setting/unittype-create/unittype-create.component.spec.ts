import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnittypeCreateComponent } from './unittype-create.component';

describe('UnittypeCreateComponent', () => {
  let component: UnittypeCreateComponent;
  let fixture: ComponentFixture<UnittypeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnittypeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnittypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
