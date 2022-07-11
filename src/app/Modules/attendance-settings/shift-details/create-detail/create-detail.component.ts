import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShiftDetails } from '../../Model/shift-details.model';
import { AttendanceSettingsService } from '../../service/attendance-settings.service';
import Swal from 'sweetalert2';
import { ConfigService } from 'src/app/core/service/congif.service';
@Component({
  selector: 'app-create-detail',
  templateUrl: './create-detail.component.html',
  styleUrls: ['./create-detail.component.scss']
})
export class CreateDetailComponent implements OnInit {
  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  shiftForm: FormGroup;
  public data: any;
  category: ShiftDetails = new ShiftDetails();
  districtId: string;
  customerId: string;
constructor(    public dialogRef: MatDialogRef<CreateDetailComponent>, public dialog: MatDialog,private getService:AttendanceSettingsService,private router:Router,private config:ConfigService) {
  this.config.init();
  this.customerId = config.customerId;
  this.districtId = config.districtId;
 }
ngOnInit(): void {
  this.shiftForm = new FormGroup({
    shiftName: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
    shiftStartTime: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
    shiftEndTime: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
  })
}
save(post) {
  this.submitButton.disabled = true;
  post.customerId=this.customerId;
  post.districtId=this.districtId
  this.getService.Create(post).subscribe((res: any) => {
    this.dialogRef.close();
    if (res.statusMessage == 'Success') {
      Swal.fire({
        icon: "success",
        title: " New Shift Created  Successfull",
        timer: 2500
      }).then(function(){
        window.location.reload();
    });
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Shift Create Failed",
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
