import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfigService } from 'src/app/core/service/congif.service';
import { Vendors } from '../Model/vendor.model';
import { VendorsService } from '../service/vendors.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.scss']
})
export class VendorCreateComponent implements OnInit {

 
  vendorForm: FormGroup
  item: Vendors = new Vendors();
  customerId: string;
  branchId: string;
  account: {};

  constructor(private config: ConfigService, private getService: VendorsService, public dialog: MatDialog, public dialogRef: MatDialogRef<VendorCreateComponent>,) {
    this.customerId = config.customerId;
    this.branchId = config.branchId;
  }

  ngOnInit(): void {
    this.vendorForm = new FormGroup({
      vendorName: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
      vendorGst: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
      vendorContactNumber: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
      vendorEmail: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
      vendorAddress: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
      bankName: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
      bankBranchName: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
      accountHolderName: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
      accountNumber: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
      branchIfscCode: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
      branchAddress: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
    })
  }
  save(post) {
    this.account = {
      bankName: this.vendorForm.value.bankName,
      bankBranchName: this.vendorForm.value.bankBranchName,
      accountHolderName: this.vendorForm.value.accountHolderName,
      accountNumber: this.vendorForm.value.accountNumber,
      branchIfscCode: this.vendorForm.value.branchIfscCode,
      branchAddress: this.vendorForm.value.branchAddress

    }

    post.vendorAccountDetailDto = this.account
    post.customerId = this.customerId
    post.branchId = this.branchId
    this.getService.vendorcreate(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusMessage == 'Created Successfully') {
        Swal.fire({
          icon: "success",
          title: " Vendor Created  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Vendor Create Failed",
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
