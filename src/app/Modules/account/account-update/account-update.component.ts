import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigService } from 'src/app/core/service/congif.service';
import Swal from 'sweetalert2';
import { Account } from '../Model/account.model';
import { AccountService } from '../service/account.service';
@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.scss']
})
export class AccountUpdateComponent implements OnInit {
  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  salaryForm: FormGroup;
  account: Account[];
  customerId: string;
  districtId: string;
  expensetype: any;
  accountId: any;
  constructor(private config: ConfigService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AccountUpdateComponent>, public dialog: MatDialog, private getService: AccountService, private formBuilder: FormBuilder) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.retriveForm(this.data.payload)
    this.getData();
  }


  retriveForm(item) {
    this.salaryForm = this.formBuilder.group({
      accountHolderName: [item.accountHolderName || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      accountNo: [item.accountNo || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      ifscCode: [item.ifscCode || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      branch: [item.branch || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      accountFor: [item.accountFor || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    })
    this.accountId = item.accountId
  }

  getData() {
    var obj = {
      'customerId': this.customerId,
      'districtId': this.districtId
    }
    this.getService.getexpesne(obj).subscribe((data) => {
      this.expensetype = data.responseModel;
    })
  }
  update(post: any) {
    this.submitButton.disabled = true;
    post.customerId = this.customerId;
    post.districtId = this.districtId;
    post.accountId = this.accountId;
    this.getService.update(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusCode == 200) {
        Swal.fire({
          icon: "success",
          title: "Salary Updated  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Salary Updated Failed",
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
