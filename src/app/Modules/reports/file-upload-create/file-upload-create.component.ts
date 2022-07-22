import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { constant } from 'src/app/core/helpers/global.helper';
import { ConfigService } from 'src/app/core/service/congif.service';
import Swal from 'sweetalert2';
import { FileUpload } from '../Model/file.model';
import { ReportService } from '../service/report.service';
@Component({
  selector: 'app-file-upload-create',
  templateUrl: './file-upload-create.component.html',
  styleUrls: ['./file-upload-create.component.scss']
})
export class FileUploadCreateComponent implements OnInit {
  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  fileForm: FormGroup;
  public data: any;
  file: FileUpload = new FileUpload();
  customerId: string;
  districtId: string;
  isFileSizeTooHigh: boolean;
  isFileResolutionHigh: boolean;
  isAttachmentFileSizeTooHigh: boolean;
  attachment: any = null;
  urls = [];
  constructor(public dialogRef: MatDialogRef<FileUploadCreateComponent>, public dialog: MatDialog, private dataService: ReportService, private router: Router, private config: ConfigService) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.fileForm = new FormGroup({
      documentTitle: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
      file: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
      fileSource: new FormControl('', [Validators.required]),
      pdfFile: new FormControl("", [
        Validators.pattern(constant().app.validators.imageAndPdf),
      ]),
    })
  }
  get control() {
    return this.fileForm.controls;
  }
  onFileChange(event) {



    if (event.target.files.length > 0) {

      const file = event.target.files[0];

      this.fileForm.patchValue({

        fileSource: file

      });

    }

  }

  clearqualifyDoc(name) {
    if (name == 'fileSource') {
      this.isAttachmentFileSizeTooHigh = false;
      this.attachment = '';
      this.fileForm.get("fileSource").setValue('');
    }
  }

  save(action: string) {
    this.submitButton.disabled = true;
    let formData = new FormData();

    formData.append('file', this.fileForm.get('fileSource').value);
    formData.append('fileName', this.fileForm.value.documentTitle);
    this.dataService.create(formData).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusCode == 200) {
        if (action == 'new') {

        } else {
          this.dialogRef.close(true);
        }
        Swal.fire({
          icon: "success",
          title: " File Upload  Successfull",
          timer: 2500
        }).then(function () {
           window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: " File Upload Failed",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
    });
  }
  discard() {
    this.dialogRef.close()
  }

}
