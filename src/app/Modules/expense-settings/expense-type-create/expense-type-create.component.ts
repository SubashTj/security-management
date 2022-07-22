import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ConfigService } from 'src/app/core/service/congif.service';
import { MatButton } from '@angular/material/button';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseType } from '../Model/expense-type.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ExpenseSettingsService } from '../expense-settings.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-expense-type-create',
  templateUrl: './expense-type-create.component.html',
  styleUrls: ['./expense-type-create.component.scss']
})
export class ExpenseTypeCreateComponent implements OnInit {

  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  expenseForm: FormGroup;
  public data: any;
  expensetype: ExpenseType = new ExpenseType();
  customerId: string;
  districtId: string;
  constructor(public dialogRef: MatDialogRef<ExpenseTypeCreateComponent>, public dialog: MatDialog, private dataService: ExpenseSettingsService, private router: Router, private config: ConfigService) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.expenseForm = new FormGroup({
      expenseName: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
    })
  }
  save(action: string) {
    this.submitButton.disabled = true;
    this.expensetype.customerId = this.customerId
    this.expensetype.districtId = this.districtId
    this.dataService.create(this.expensetype).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusCode == 200) {
        this.dataService.recordAddedSubject.next(res.responseModel);
        if (action == 'new') {
          this.expenseForm.reset();
        } else {
          this.dialogRef.close(true);
          // this.router.navigate([`/department/list`]);
        }
        Swal.fire({
          icon: "success",
          title: " Expense-Type Created  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: " Expense-Type Create Failed",
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
