import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShiftAssign } from '../../Model/shift-assign.model';
import { AttendanceSettingsService } from '../../service/attendance-settings.service';
import Swal from 'sweetalert2';
import { ConfigService } from 'src/app/core/service/congif.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  shiftForm: FormGroup;
  public data: any;
  category: ShiftAssign = new ShiftAssign();
  positions: any;
  departments: any;
  employee: any;
  Shift:any
  customerId: string;
  districtId: string;
constructor(    public dialogRef: MatDialogRef<CreateComponent>,private config:ConfigService, public dialog: MatDialog,private getService:AttendanceSettingsService,private router:Router) {
  this.config.init();
  this.customerId = config.customerId;
  this.districtId = config.districtId;
 }
ngOnInit(): void {
  this.shiftForm = new FormGroup({
    departmentId: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
    designationId: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
    employeeId: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
    shiftId: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
  }) 
  this.getDepartment();
  this.getEmployee();
  this.getShift();
}
save(post) {
  this.submitButton.disabled = true;
  post.customerId=this.customerId;
  post.districtId=this.districtId
  this.getService.create(post).subscribe((res: any) => {
    this.dialogRef.close();
    if (res.statusMessage == 'Success') {
      Swal.fire({
        icon: "success",
        title: " Shift Assigned  Successfull",
        timer: 2500
      }).then(function(){
        window.location.reload();
    });
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Shift Assigned  Failed",
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
getDepartment(){
  var obj = {
    'customerId': this.customerId,
  }
  this.getService.getDepartment(obj).subscribe((data) => {
    this.departments = data.responseModel;
    console.log(data)
  })
}
onItemSelect(event: any) {
  var obj = {
    'departmentId': event.value,
    'customerId': this.customerId,
  }
  this.getService.getPosition(obj).subscribe((data) => {
    this.positions = data.responseModel;
    console.log(data)
  })
}
getEmployee(){
  var obj = {
    'customerId': this.customerId,
    'districtId': this.districtId
  }
  this.getService.getList(obj).subscribe((data) => {
    this.employee =data.responseModel;
    console.log(data)
 
  })
}
getShift(){
  var obj = {
    'customerId': this.customerId,
    'districtId': this.districtId
  }
  this.getService.getDetails(obj).subscribe((data) => {
    this.Shift = data.responseModel;
    console.log(data)
  })
}
}
