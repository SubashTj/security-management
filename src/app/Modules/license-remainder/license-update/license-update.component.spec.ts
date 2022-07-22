import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseUpdateComponent } from './license-update.component';

describe('LicenseUpdateComponent', () => {
  let component: LicenseUpdateComponent;
  let fixture: ComponentFixture<LicenseUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
