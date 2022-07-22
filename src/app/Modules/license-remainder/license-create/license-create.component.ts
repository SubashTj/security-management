import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfigService } from 'src/app/core/service/congif.service';
import { License } from '../Model/license.model';
import { LicenseRemainderService } from '../service/license-remainder.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-license-create',
  templateUrl: './license-create.component.html',
  styleUrls: ['./license-create.component.scss']
})
export class LicenseCreateComponent implements OnInit {

  departments: any
  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  licenseForm: FormGroup;
  public data: any;
  inventory: License[];
  customerId: string;
  districtId: string;
  invenorytype: License[];
  stock: any;
  constructor(private config: ConfigService, public dialogRef: MatDialogRef<LicenseCreateComponent>, public dialog: MatDialog, private getService: LicenseRemainderService) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.licenseForm = new FormGroup({
      licenseName: new FormControl('', [Validators.required]),
      licenseNumber: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required])
    })
  }

  save(post: any) {
    this.submitButton.disabled = true;
    post.customerId = this.customerId;
    this.getService.create(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusCode == 200) {
        Swal.fire({
          icon: "success",
          title: "License-Remainder  Updated  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "License-Remainder  Update Failed",
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
