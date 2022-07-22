import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/helpers/format-datepicker';
import { AppServerDatePipe } from 'src/app/shared/pipes/app-config.pipe';
import { HolidayService } from '../service/holiday.service';
import Swal from 'sweetalert2';
import { ConfigService } from 'src/app/core/service/congif.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    AppServerDatePipe,
  ]
})
export class CreateComponent implements OnInit {
  @ViewChild(MatButton) submitButton: MatButton;

  formData = {}
  basicForm: FormGroup;
  holidayId: any;
  data: any;
  customerId: string;
  districtId: string;
  constructor(public config: ConfigService, public dialogRef: MatDialogRef<CreateComponent>, public dialog: MatDialog, private getService: HolidayService, private severdatePipe: AppServerDatePipe) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }

  ngOnInit(): void {
    this.form();
  }
  form() {
    this.basicForm = new FormGroup({
      title: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
      description: new FormControl(''),
    });
  }
  get control() {
    return this.basicForm.controls;
  }

  save() {
    var form = this.basicForm.value;
    const fromDate = this.severdatePipe.transform(form?.fromDate);
    const toDate = this.severdatePipe.transform(form?.toDate);
    this.submitButton.disabled = true;
    let obj = {
      "customerId": this.customerId,
      "districtId": this.districtId,
      "title": form?.title,
      "fromDate": fromDate,
      "toDate": toDate,
      "description": form?.description
    }
    this.getService.create(obj).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusMessage == 'Success') {
        Swal.fire({
          icon: "success",
          title: "Holiday Created  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Holiday Create Failed",
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
