import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigService } from 'src/app/core/service/congif.service';
import Swal from 'sweetalert2';
import { District } from '../../branch-management/Model/branch.model';
import { Invoice } from '../Model/invoice.model';
import { InvoiceSettingsService } from '../service/invoice-settings.service';
@Component({
  selector: 'app-invoice-update',
  templateUrl: './invoice-update.component.html',
  styleUrls: ['./invoice-update.component.scss']
})
export class InvoiceUpdateComponent implements OnInit {
  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  salaryForm: FormGroup;
  account: Invoice[];
  customerId: string;
  districtId: string;
  expensetype: any;
  accountId: any;
  referenceNo: any;
  receiver: Invoice[];
  sender: Invoice[];
  transactiontype: Invoice[];
  branches: District[];
  constructor(private config: ConfigService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<InvoiceUpdateComponent>, public dialog: MatDialog, private getService: InvoiceSettingsService, private formBuilder: FormBuilder) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.retriveForm(this.data.payload);
  }


  retriveForm(item) {
    this.salaryForm = this.formBuilder.group({
      referenceNo: [item.referenceNo || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      esi: [item.esi || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      epf: [item.epf || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      cgst: [item.cgst || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      sgst: [item.sgst || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      mode: [item.mode || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      bankGstNo: [item.bankGstNo || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    })
    this.referenceNo = item.referenceNo
  }
  update(post: any) {
    this.submitButton.disabled = true;
    post.customerId = this.customerId;
    this.getService.update(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusCode == 200) {
        Swal.fire({
          icon: "success",
          title: "Invoice Updated  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Invoice Updated Failed",
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
