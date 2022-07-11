
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ConfigService } from 'src/app/core/service/congif.service';
import { MatButton } from '@angular/material/button';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ExpenseSettingsService } from '../expense-settings.service';
import { Router } from '@angular/router';
import { TransactionType } from '../Model/transaction-type.model';
@Component({
  selector: 'app-transaction-type-create',
  templateUrl: './transaction-type-create.component.html',
  styleUrls: ['./transaction-type-create.component.scss']
})
export class TransactionTypeCreateComponent implements OnInit {

  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  expenseForm: FormGroup;
  public data: any;
  transactiontype: TransactionType = new TransactionType();
  customerId: string;
  districtId: string;
  constructor(public dialogRef: MatDialogRef<TransactionTypeCreateComponent>, public dialog: MatDialog, private dataService: ExpenseSettingsService, private router: Router, private config: ConfigService) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.expenseForm = new FormGroup({
      type: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
    })
  }
  save(action: string) {
    this.submitButton.disabled = true;
    this.transactiontype.customerId = this.customerId
    this.transactiontype.districtId = this.districtId
    this.dataService.Create(this.transactiontype).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusMessage == 'Success') {
        this.dataService.recordAddedSubject.next(res.responseModel);
        if (action == 'new') {
          this.expenseForm.reset();
        } else {
          this.dialogRef.close(true);
          // this.router.navigate([`/department/list`]);
        }
        Swal.fire({
          icon: "success",
          title: "Transaction-Type Created  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: " Transaction-Type Create Failed",
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
