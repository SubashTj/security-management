import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadCreateComponent } from './file-upload-create.component';

describe('FileUploadCreateComponent', () => {
  let component: FileUploadCreateComponent;
  let fixture: ComponentFixture<FileUploadCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
