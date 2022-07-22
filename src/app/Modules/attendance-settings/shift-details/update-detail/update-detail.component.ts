import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShiftDetails } from '../../Model/shift-details.model';
import { AttendanceSettingsService } from '../../service/attendance-settings.service';
import Swal from 'sweetalert2';
import { ConfigService } from 'src/app/core/service/congif.service';
@Component({
  selector: 'app-update-detail',
  templateUrl: './update-detail.component.html',
  styleUrls: ['./update-detail.component.scss']
})
export class UpdateDetailComponent implements OnInit {
  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  shiftForm: FormGroup;
  category: ShiftDetails = new ShiftDetails();
  customerId: string;
  districtId: string;
constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<UpdateDetailComponent>,private config:ConfigService, public dialog: MatDialog,private getService:AttendanceSettingsService,private router:Router, private formBuilder: FormBuilder) { 
  this.config.init();
  this.customerId = config.customerId;
  this.districtId = config.districtId;
}
ngOnInit(): void {
  this.retriveForm(this.data.payload)
} 


retriveForm(item) {
  this.shiftForm = this.formBuilder.group({
    shiftId: [item.shiftId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    shiftName: [item.shiftName || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    shiftStartTime: [item.shiftStartTime || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    shiftEndTime: [item.shiftEndTime || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],

  })
}
Update(post:any) {
  this.submitButton.disabled = true;
  post.customerId=this.customerId;
  post.districtId=this.districtId
  this.getService.Update(post).subscribe((res: any) => {
    this.dialogRef.close();
    if (res.statusMessage == 'Success') {
      Swal.fire({
        icon: "success",
        title: "  Shift Updated  Successfull",
        timer: 2500
      }).then(function(){
        window.location.reload();
    });
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Shift Update Failed",
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
