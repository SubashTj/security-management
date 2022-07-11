import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigService } from 'src/app/core/service/congif.service';
import Swal from 'sweetalert2';
import { Vendors } from '../Model/vendor.model';
import { VendorsService } from '../service/vendors.service';
@Component({
  selector: 'app-vendor-update',
  templateUrl: './vendor-update.component.html',
  styleUrls: ['./vendor-update.component.scss']
})
export class VendorUpdateComponent implements OnInit {

  vendorForm: FormGroup
  item: Vendors = new Vendors();
  account: {};
  customerId: any;
  branchId: any;
  vendorId: any;

  constructor(private config: ConfigService, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private modelService: VendorsService, public dialogRef: MatDialogRef<VendorUpdateComponent>, private formBuilder: FormBuilder) {
    this.customerId = config.customerId;
    this.branchId = config.branchId;
  }

  ngOnInit(): void {
    this.retriveForm(this.data.payload)
  }
  retriveForm(item) {
    this.vendorForm = this.formBuilder.group({

      vendorId: [item.vendorId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      vendorName: [item.vendorName || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      vendorGst: [item.vendorGst || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      vendorContactNumber: [item.vendorContactNumber || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      vendorEmail: [item.vendorEmail || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      vendorAddress: [item.vendorAddress || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      bankName: [item.vendorAccountDetailDao.bankName || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      accountId: [item.vendorAccountDetailDao.accountId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      bankBranchName: [item.vendorAccountDetailDao.bankBranchName || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      accountHolderName: [item.vendorAccountDetailDao.accountHolderName || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      accountNumber: [item.vendorAccountDetailDao.accountNumber || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      branchIfscCode: [item.vendorAccountDetailDao.branchIfscCode || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      branchAddress: [item.vendorAccountDetailDao.branchAddress || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],

    })
    this.vendorId = item.vendorId
  }
  Update(post) {
    this.account = {
      accountId: this.vendorForm.value.accountId,
      vendorId: this.vendorForm.value.vendorId,
      bankName: this.vendorForm.value.bankName,
      bankBranchName: this.vendorForm.value.bankBranchName,
      accountHolderName: this.vendorForm.value.accountHolderName,
      accountNumber: this.vendorForm.value.accountNumber,
      branchIfscCode: this.vendorForm.value.branchIfscCode,
      branchAddress: this.vendorForm.value.branchAddress
    }
    post.vendorId = this.vendorId
    post.vendorAccountDetailDao = this.account
    post.customerId = this.customerId
    this.modelService.Update(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusCode == 200) {
        Swal.fire({
          icon: "success",
          title: "Vendor Updated  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Vendor Updated Failed",
          timer: 2500

        }).then(function () {
          // window.location.reload();
        });

      }
    });
  }

  discard() {
    this.dialogRef.close(true)
  }


}
