import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleUpdateComponent } from './rule-update.component';

describe('RuleUpdateComponent', () => {
  let component: RuleUpdateComponent;
  let fixture: ComponentFixture<RuleUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
