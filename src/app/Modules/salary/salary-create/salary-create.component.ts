import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfigService } from 'src/app/core/service/congif.service';
import Swal from 'sweetalert2';
import { Department } from '../../department/Department-Model/department.model';
import { SalaryService } from '../salary.service';
@Component({
  selector: 'app-salary-create',
  templateUrl: './salary-create.component.html',
  styleUrls: ['./salary-create.component.scss']
})
export class SalaryCreateComponent implements OnInit {
  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  salaryForm: FormGroup;
  public data: any;
  departments: Department[];
  customerId: string;
  districtId: string;
constructor(private config:ConfigService,public dialogRef: MatDialogRef<SalaryCreateComponent>,public dialog: MatDialog,private getService:SalaryService) { 
  this.config.init();
  this.customerId = config.customerId;
  this.districtId = config.districtId;
}
ngOnInit(): void {
  this.salaryForm = new FormGroup({
    designation: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
    departmentId: new FormControl('', [Validators.required])
  })
this.getData();
}
getData(){
  var obj = {
    'customerId': this.customerId
  }
  this.getService.getDepartment(obj).subscribe((data) => {
this.departments=data.responseModel;
    console.log(data)
  })
}
save(post:any) {
  this.submitButton.disabled = true;
  post.customerId=this.customerId;
  post.districtId=this.districtId
  this.getService.create(post).subscribe((res: any) => {
    this.dialogRef.close();
      if (res.statusMessage == 'Success') {
        Swal.fire({
          icon: "success",
          title: "Salary Created  Successfull",
          timer: 2500
        }).then(function(){
          window.location.reload();
      });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Salary Create Failed",
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
