import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Department } from '../Department-Model/department.model';
import { DepartmentService } from '../service/department.service';
import Swal from 'sweetalert2';
import { ConfigService } from 'src/app/core/service/congif.service';
@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.scss']
})
export class UpdateDepartmentComponent implements OnInit {
  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  departmentForm: FormGroup;
  category: Department = new Department();
  customerId: string;
constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<UpdateDepartmentComponent>,private config:ConfigService, public dialog: MatDialog,private getService:DepartmentService,private router:Router, private formBuilder: FormBuilder) {
  this.config.init();
  this.customerId = config.customerId;
 }
ngOnInit(): void {
  this.retriveForm(this.data.payload)
} 


retriveForm(item) {
  this.departmentForm = this.formBuilder.group({
    departmentId: [item.departmentId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    departmentName: [item.departmentName || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
  })
}
Update(post:any) {
  this.submitButton.disabled = true;
  post.customerId=this.customerId;
  this.getService.update(post).subscribe((res: any) => {
    this.dialogRef.close();
    if (res.statusMessage == 'Success') {
      Swal.fire({
        icon: "success",
        title: " Department Updated Successfull",
        timer: 2500
      }).then(function(){
        window.location.reload();
    });
    }
    else {
      Swal.fire({
        icon: "error",
        title: " Department Update Failed",
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
