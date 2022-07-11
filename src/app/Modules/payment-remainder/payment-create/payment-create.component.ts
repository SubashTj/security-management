import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfigService } from 'src/app/core/service/congif.service';
import Swal from 'sweetalert2';
import { Payment } from '../Model/payment.model';
import { PaymentRemainderService } from '../service/payment-remainder.service';
@Component({
  selector: 'app-payment-create',
  templateUrl: './payment-create.component.html',
  styleUrls: ['./payment-create.component.scss']
})
export class PaymentCreateComponent implements OnInit {
  departments: any
  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  paymentForm: FormGroup;
  public data: any;
  inventory: Payment[];
  customerId: string;
  districtId: string;
  invenorytype: Payment[];
  stock: any;
  constructor(private config: ConfigService, public dialogRef: MatDialogRef<PaymentCreateComponent>, public dialog: MatDialog, private getService:PaymentRemainderService) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.paymentForm = new FormGroup({
      paymentName: new FormControl('', [Validators.required]),
      paymentAmount: new FormControl('', [Validators.required]),
      paymentFrom: new FormControl('', [Validators.required]),
      paymentTo: new FormControl('', [Validators.required]),
      paymentStartDate: new FormControl('', [Validators.required]),
      paymentEndDate: new FormControl('', [Validators.required])
    })
  }

  save(post: any) {
    this.submitButton.disabled = true;
    post.customerId = this.customerId;
    this.getService.create(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusCode == 200) {
        Swal.fire({
          icon: "success",
          title: "Payment-Remainder  Updated  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Payment-Remainder  Update Failed",
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
