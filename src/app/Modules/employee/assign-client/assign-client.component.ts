import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigService } from 'src/app/core/service/congif.service';
import { Department } from '../../department/Department-Model/department.model';
import { Employees } from '../Model/employees.model';
import Swal from 'sweetalert2';
import { EmployeeService } from '../service/employee.service';
import { Router } from '@angular/router';
import { District } from '../../branch-management/Model/branch.model';
@Component({
  selector: 'app-assign-client',
  templateUrl: './assign-client.component.html',
  styleUrls: ['./assign-client.component.scss']
})
export class AssignClientComponent implements OnInit {
  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  clientForm: FormGroup;
  category: Employees = new Employees();
  customerId: string;
  districtId: string;
  departments: Department[];
  branches: District[];
  employee: Employees[];
  clients: District[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AssignClientComponent>, private config: ConfigService, public dialog: MatDialog, private getService: EmployeeService, private router: Router, private formBuilder: FormBuilder) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.retriveForm(this.data.payload)
    this.getData();
    this.getBranch();
  }


  retriveForm(item) {
    this.clientForm = this.formBuilder.group({
      branchId: [item.branchId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      departmentId: [item.departmentId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      employeeId: [item.employeeId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      name: [item.name || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      branchDistrictId: [item.branchDistrictId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    })
  }
  getData() {
    var obj = {
      'customerId': this.customerId
    }
    this.getService.getDepartment(obj).subscribe((data) => {
      this.departments = data.responseModel;
      console.log(data)
    })
  }
  getBranch() {
    var obj = {
      'customerId': this.customerId,
    }
    this.getService.getbranch(obj).subscribe((data) => {
      this.branches = data.responseModel;
      console.log(data)
    })
  }
  onItemSelect(event: any) {
    var obj = {
      'customerId': this.customerId,
      'districtId': event.value
    }
    this.getService.getClient(obj).subscribe((data) => {
      this.clients = data.responseModel;
      console.log(data)
    })

  }
  getEmployee() {
    var obj = {
      'customerId': this.customerId,
      'districtId': this.districtId
    }
    this.getService.getList(obj).subscribe((data) => {
      this.employee = data.responseModel;
      console.log(data)

    })
  }
  Update(post: any) {

    this.submitButton.disabled = true;
    post.districtId = this.districtId;
    post.customerId = this.customerId;

    this.getService.employeeClient([post]).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusCode == 200) {
        Swal.fire({
          icon: "success",
          title: "Branch Assign  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Branch Assign Failed",
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
