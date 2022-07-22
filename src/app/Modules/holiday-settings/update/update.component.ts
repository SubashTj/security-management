import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/helpers/format-datepicker';
import { AppServerDatePipe } from 'src/app/shared/pipes/app-config.pipe';
import { HolidayService } from '../service/holiday.service';
import Swal from 'sweetalert2';
import { ConfigService } from 'src/app/core/service/congif.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    AppServerDatePipe,
  ]
})
export class UpdateComponent implements OnInit {
  @ViewChild(MatButton) submitButton: MatButton;

  formData = {}
  basicForm: FormGroup;
  holidayId: any;
  customerId: string;
  districtId: string;

  constructor(public config: ConfigService,@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<UpdateComponent>, public dialog: MatDialog,private getService:HolidayService,  private severdatePipe: AppServerDatePipe,  private formBuilder: FormBuilder) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
   }
  ngOnInit(): void {

    this.retriveForm(this.data.payload)
  } 

  
  retriveForm(item) {
    this.basicForm = this.formBuilder.group({
      holidayId: [item.holidayId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      title: [item.title || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      fromDate: [item.fromDate || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]], 
      toDate: [item.toDate || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      description: [item.description || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    })
  }
  get control() {
    return this.basicForm.controls;
  }

  Update() {
    var form = this.basicForm.value;
    const fromDate = this.severdatePipe.transform(form?.fromDate);
    const toDate = this.severdatePipe.transform(form?.toDate);
    this.submitButton.disabled = true;
let obj={
  "holidayId":form?.holidayId,
  "customerId":this.customerId,
  "districtId":this.districtId,
  "title":form?.title,
  "fromDate":fromDate,
  "toDate":toDate,
  "description":form?.description
}
    this.getService.update(obj).subscribe((res: any) => {
      this.dialogRef.close();
    if (res.statusMessage == 'Success') {
      Swal.fire({
        icon: "success",
        title: "Holiday Updated  Successfull",
        timer: 2500
      }).then(function(){
        window.location.reload();
    });
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Holiday Updated Failed",
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
