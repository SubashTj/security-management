import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ConfigService } from 'src/app/core/service/congif.service';
import { ExpenseSettingsService } from '../expense-settings.service';
import { TransactionType } from '../Model/transaction-type.model';

@Component({
  selector: 'app-transaction-type-update',
  templateUrl: './transaction-type-update.component.html',
  styleUrls: ['./transaction-type-update.component.scss']
})
export class TransactionTypeUpdateComponent implements OnInit {

  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  expenseForm: FormGroup;
  category: TransactionType = new TransactionType();
  customerId: string;
  districtId: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<TransactionTypeUpdateComponent>, private config: ConfigService, public dialog: MatDialog, private getService: ExpenseSettingsService, private router: Router, private formBuilder: FormBuilder) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.retriveForm(this.data.payload)
  }


  retriveForm(item) {
    this.expenseForm = this.formBuilder.group({
      id: [item.id || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      type: [item.type || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    })
  }
  Update(post: any) {
    this.submitButton.disabled = true;
    post.customerId = this.customerId;
    post.districtId = this.districtId;
    this.getService.Update(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusMessage == 'Success') {
        Swal.fire({
          icon: "success",
          title: "Transaction-Type Updated Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Transaction-Type Update Failed",
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
