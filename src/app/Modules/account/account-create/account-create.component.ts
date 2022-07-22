import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfigService } from 'src/app/core/service/congif.service';
import Swal from 'sweetalert2';
import { Account } from '../Model/account.model';
import { AccountService } from '../service/account.service';
@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss']
})
export class AccountCreateComponent implements OnInit {

  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  salaryForm: FormGroup;
  public data: any;
  account: Account[];
  customerId: string;
  districtId: string;
  expensetype: any;
  constructor(private config: ConfigService, public dialogRef: MatDialogRef<AccountCreateComponent>, public dialog: MatDialog, private getService: AccountService) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.salaryForm = new FormGroup({
      accountHolderName: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
      accountNo: new FormControl('', [Validators.required]),
      ifscCode: new FormControl('', [Validators.required]),
      branch: new FormControl('', [Validators.required]),
      accountFor: new FormControl('', [Validators.required])
    })
    this.getData();
  }
  getData() {
    var obj = {
      'customerId': this.customerId,
      'districtId': this.districtId
    }
    this.getService.getexpesne(obj).subscribe((data) => {
      this.expensetype = data.responseModel;
      console.log(data)
    })
  }
  save(post: any) {
    this.submitButton.disabled = true;
    post.customerId = this.customerId;
    post.districtId = this.districtId
    this.getService.create(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusCode == 200) {
        Swal.fire({
          icon: "success",
          title: "Salary Created  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Salary Create Failed",
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
