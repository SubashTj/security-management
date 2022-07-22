import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigService } from 'src/app/core/service/congif.service';
import Swal from 'sweetalert2';
import { District } from '../../branch-management/Model/branch.model';
import { Expense } from '../Model/expense.model';
import { ExpenseService } from '../service/expense.service';
@Component({
  selector: 'app-expense-update',
  templateUrl: './expense-update.component.html',
  styleUrls: ['./expense-update.component.scss']
})
export class ExpenseUpdateComponent implements OnInit {
  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  salaryForm: FormGroup;
  account: Expense[];
  customerId: string;
  districtId: string;
  expensetype: any;
  accountId: any;
  expenseId: any;
  receiver: Expense[];
  sender: Expense[];
  transactiontype: Expense[];
  branches: District[];
  constructor(private config: ConfigService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ExpenseUpdateComponent>, public dialog: MatDialog, private getService: ExpenseService, private formBuilder: FormBuilder) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.retriveForm(this.data.payload)
    this.getData();
    this.getDatas();
    this.getReciver();
    this.getSender();
    this.getBranch();
  }


  retriveForm(item) {
    this.salaryForm = this.formBuilder.group({
      districtId: [item.districtId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      expenseTypeId: [item.expenseTypeId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      expenseDescription: [item.expenseDescription || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      transactionTypeId: [item.transactionTypeId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      date: [item.date || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      senderAccountId: [item.senderAccountId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      receiverAccountId: [item.receiverAccountId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      amount: [item.amount || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    })
    this.expenseId = item.expenseId
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
  getBranch() {
    var obj = {
      'customerId': this.customerId,
    }
    this.getService.getbranch(obj).subscribe((data) => {
      this.branches = data.responseModel;
    })
  }
  getDatas() {

    this.getService.getTransaction().subscribe((data) => {
      this.transactiontype = data.responseModel;
      console.log(data)
    })
  }
  getSender() {
    var obj = {
      'customerId': this.customerId,
      'accountFor': 'self'
    }
    this.getService.getSender(obj).subscribe((data) => {
      this.sender = data.responseModel;
      console.log(data)
    })
  }
  getReciver() {
    var obj = {
      'customerId': this.customerId
    }
    this.getService.getReceiver(obj).subscribe((data) => {
      this.receiver = data.responseModel;
      console.log(data)
    })
  }
  update(post: any) {
    this.submitButton.disabled = true;
    post.customerId = this.customerId;
    post.expenseId = this.expenseId;
    this.getService.update(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusCode == 200) {
        Swal.fire({
          icon: "success",
          title: "Expense Updated  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Expense Updated Failed",
          timer: 2500

        }).then(function () {

          // window.location.reload();
        });

      }
    });
  }
  discard() {
    this.dialogRef.close()
  }
}
