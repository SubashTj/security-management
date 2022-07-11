import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfigService } from 'src/app/core/service/congif.service';
import Swal from 'sweetalert2';
import { Expense } from '../Model/expense.model';
import { ExpenseService } from '../service/expense.service';
@Component({
  selector: 'app-expense-create',
  templateUrl: './expense-create.component.html',
  styleUrls: ['./expense-create.component.scss']
})
export class ExpenseCreateComponent implements OnInit {

  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  salaryForm: FormGroup;
  public data: any;
  account: Expense[];
  customerId: string;
  districtId: string;
  expensetype: any;
  transactiontype: Expense[];
  resceiver: Expense[];
  receiver: Expense[];
  sender: Expense[];
  branches: any;
constructor(private config:ConfigService,public dialogRef: MatDialogRef<ExpenseCreateComponent>,public dialog: MatDialog,private getService:ExpenseService) { 
  this.config.init();
  this.customerId = config.customerId;
  this.districtId = config.districtId;
}
ngOnInit(): void {
  this.salaryForm = new FormGroup({
    expenseTypeId: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
    expenseDescription: new FormControl('', [Validators.required]),
    districtId: new FormControl('', [Validators.required]),
    transactionTypeId: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    senderAccountId: new FormControl('', [Validators.required]),
    receiverAccountId: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
  })
this.getData();
this.getDatas();
this.getReciver();
this.getSender();
this.getBranch();
}
getData(){
  var obj = {
    'customerId': this.customerId,
    'districtId': this.districtId
  }
  this.getService.getexpesne(obj).subscribe((data) => {
this.expensetype=data.responseModel;
    console.log(data)
  })
}
getDatas(){
 
  this.getService.getTransaction().subscribe((data) => {
this.transactiontype=data.responseModel;
    console.log(data)
  })
}
getSender(){
  var obj = {
    'customerId': this.customerId,
    'accountFor': 'self'
  }
  this.getService.getSender(obj).subscribe((data) => {
this.sender=data.responseModel;
    console.log(data)
  })
}
getReciver(){
  var obj = {
    'customerId': this.customerId
  }
  this.getService.getReceiver(obj).subscribe((data) => {
this.receiver=data.responseModel;
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
save(post:any) {
  this.submitButton.disabled = true;
  post.customerId=this.customerId;
  this.getService.create(post).subscribe((res: any) => {
    this.dialogRef.close();
      if (res.statusCode == 200) {
        Swal.fire({
          icon: "success",
          title: "Expense Created  Successfull",
          timer: 2500
        }).then(function(){
         window.location.reload();
      });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Expense Create Failed",
          timer: 2500
      
        }).then(function(){
          window.location.reload();
      });
        
      }
  });
}
discard() {
  this.dialogRef.close()
}

}
