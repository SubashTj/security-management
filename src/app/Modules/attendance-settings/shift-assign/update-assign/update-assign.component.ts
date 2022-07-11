import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShiftAssign } from '../../Model/shift-assign.model';
import { AttendanceSettingsService } from '../../service/attendance-settings.service';
import Swal from 'sweetalert2';
import { ConfigService } from 'src/app/core/service/congif.service';
import { Position } from 'ngx-perfect-scrollbar';
import { Positions } from 'src/app/modules/job-position/Model/positions.model';
@Component({
  selector: 'app-update-assign',
  templateUrl: './update-assign.component.html',
  styleUrls: ['./update-assign.component.scss']
})
export class UpdateAssignComponent implements OnInit {
  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  shiftForm: FormGroup;
  category: ShiftAssign = new ShiftAssign();
  positions: any;
  departments: any;
  employee: any;
  Shift:any
  customerId: string;
  districtId: string;
  departmentId: any;
constructor(@Inject(MAT_DIALOG_DATA) public data: any,private config:ConfigService,public dialogRef: MatDialogRef<UpdateAssignComponent>, public dialog: MatDialog,private getService:AttendanceSettingsService,private router:Router, private formBuilder: FormBuilder) { 
  this.config.init();
  this.customerId = config.customerId;
  this.districtId = config.districtId;
}
ngOnInit(): void {
  this.retriveForm(this.data.payload)
  this.getDepartment();
  this.getEmployee();
  this.getShift();

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
onItemSelect(event:any,position:Positions) {
  var obj = {
    'departmentId': position.departmentId,
    'customerId': this.customerId
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
retriveForm(item) {
  this.shiftForm = this.formBuilder.group({
    shiftAssignId: [item.shiftAssignId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    departmentId: [item.departmentId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    designationId: [item.designationId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    employeeId: [item.employeeId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    shiftId: [item.shiftId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
  })
this.departmentId=item.departmentId
}
Update(post:any) {
  this.submitButton.disabled = true;
  post.customerId=this.customerId;
  post.districtId=this.districtId
  this.getService.update(post).subscribe((res: any) => {
    this.dialogRef.close()
    if (res.statusMessage == 'Success') {
      Swal.fire({
        icon: "success",
        title: " Shift Updated  Successfull",
        timer: 2500
      }).then(function(){
        window.location.reload();
    });
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Shift Updated  Failed",
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
