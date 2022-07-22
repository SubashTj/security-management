import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigService } from 'src/app/core/service/congif.service';
import { License } from '../Model/license.model';
import { LicenseRemainderService } from '../service/license-remainder.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-license-update',
  templateUrl: './license-update.component.html',
  styleUrls: ['./license-update.component.scss']
})
export class LicenseUpdateComponent implements OnInit {
  licenseForm: FormGroup;
  formData = {}
  item: License = new License();
  @ViewChild(MatButton) submitButton: MatButton;
  customerId: string;
  districtId: string;
  licenseId: any;
  constructor(private config: ConfigService, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public dialogRef: MatDialogRef<LicenseUpdateComponent>, private modelService: LicenseRemainderService, private formBuilder: FormBuilder) {
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.retriveForm(this.data.payload)
  }
  retriveForm(item) {
    this.licenseForm = this.formBuilder.group({
      licenseName: [item.licenseName || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      licenseNumber: [item.licenseNumber || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      startDate: [item.startDate || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      endDate: [item.endDate || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    })
    this.licenseId = item.licenseId
  }

  Update(post: any) {
    post.customerId = this.customerId
    post.licenseId = this.licenseId
    this.modelService.update(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusCode == 200) {
        Swal.fire({
          icon: "success",
          title: "Stock-In-Out Updated  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Stock-In-Out Updated Failed",
          timer: 2500

        }).then(function () {
          window.location.reload();
        });

      }
    });
  }

  discard() {
    this.dialogRef.close(true)
  }



}
