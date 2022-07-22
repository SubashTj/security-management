import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginandlogoutComponent } from './loginandlogout.component';

describe('LoginandlogoutComponent', () => {
  let component: LoginandlogoutComponent;
  let fixture: ComponentFixture<LoginandlogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginandlogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginandlogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
