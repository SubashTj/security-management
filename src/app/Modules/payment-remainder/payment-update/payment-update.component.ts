import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigService } from 'src/app/core/service/congif.service';
import Swal from 'sweetalert2';
import { Payment } from '../Model/payment.model';
import { PaymentRemainderService } from '../service/payment-remainder.service';
@Component({
  selector: 'app-payment-update',
  templateUrl: './payment-update.component.html',
  styleUrls: ['./payment-update.component.scss']
})
export class PaymentUpdateComponent implements OnInit {
  paymentForm: FormGroup;
  formData = {}
  item: Payment = new Payment();
  departments: any
  @ViewChild(MatButton) submitButton: MatButton;
  customerId: string;
  districtId: string;
  paymentPendingId: any;
  constructor(private config: ConfigService, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public dialogRef: MatDialogRef<PaymentUpdateComponent>, private modelService: PaymentRemainderService, private formBuilder: FormBuilder) {
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.retriveForm(this.data.payload)
  }
  retriveForm(item) {
    this.paymentForm = this.formBuilder.group({
      paymentName: [item.paymentName || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      paymentAmount: [item.paymentAmount || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      paymentFrom: [item.paymentFrom || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      paymentTo: [item.paymentTo || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      paymentStartDate: [item.paymentStartDate || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      paymentEndDate: [item.paymentEndDate || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    })
    this.paymentPendingId = item.paymentPendingId
  }

  Update(post: any) {
    post.customerId = this.customerId
    post.paymentPendingId = this.paymentPendingId
    this.modelService.update(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusCode == 200) {
        Swal.fire({
          icon: "success",
          title: "Stock-In-Out Updated  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Stock-In-Out Updated Failed",
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
