import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsiEpfComponent } from './esi-epf.component';

describe('EsiEpfComponent', () => {
  let component: EsiEpfComponent;
  let fixture: ComponentFixture<EsiEpfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsiEpfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsiEpfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
