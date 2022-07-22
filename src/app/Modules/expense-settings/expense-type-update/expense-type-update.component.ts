import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ConfigService } from 'src/app/core/service/congif.service';
import { ExpenseType } from '../Model/expense-type.model';
import { ExpenseSettingsService } from '../expense-settings.service';
@Component({
  selector: 'app-expense-type-update',
  templateUrl: './expense-type-update.component.html',
  styleUrls: ['./expense-type-update.component.scss']
})
export class ExpenseTypeUpdateComponent implements OnInit {
  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  expenseForm: FormGroup;
  category: ExpenseType = new ExpenseType();
  customerId: string;
  districtId: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ExpenseTypeUpdateComponent>, private config: ConfigService, public dialog: MatDialog, private getService: ExpenseSettingsService, private router: Router, private formBuilder: FormBuilder) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.retriveForm(this.data.payload)
  }


  retriveForm(item) {
    this.expenseForm = this.formBuilder.group({
      expenseTypeId: [item.expenseTypeId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      expenseName: [item.expenseName || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    })
  }
  Update(post: any) {
    this.submitButton.disabled = true;
    post.customerId = this.customerId;
    post.districtId = this.districtId;
    this.getService.update(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusCode == 200) {
        Swal.fire({
          icon: "success",
          title: " Expense-Type Updated Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: " Expense-Type Update Failed",
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
