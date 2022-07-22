import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfigService } from 'src/app/core/service/congif.service';
import { Invoice } from '../Model/invoice.model';
import { InvoiceSettingsService } from '../service/invoice-settings.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.scss']
})
export class InvoiceCreateComponent implements OnInit {


  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  salaryForm: FormGroup;
  public data: any;
  account: Invoice[];
  customerId: string;
  districtId: string;
  expensetype: any;
  transactiontype: Invoice[];
  resceiver: Invoice[];
  receiver: Invoice[];
  sender: Invoice[];
  branches: any;
  constructor(private config: ConfigService, public dialogRef: MatDialogRef<InvoiceCreateComponent>, public dialog: MatDialog, private getService: InvoiceSettingsService) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.salaryForm = new FormGroup({
      referenceNumber: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
      esi: new FormControl('', [Validators.required]),
      epf: new FormControl('', [Validators.required]),
      cgst: new FormControl('', [Validators.required]),
      sgst: new FormControl('', [Validators.required]),
      mode: new FormControl('', [Validators.required]),
      bankGstNo: new FormControl('', [Validators.required]),
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
          title: "Invoice Created  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Invoice Create Failed",
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
