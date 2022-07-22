import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/core/service/congif.service';
import Swal from 'sweetalert2';
import { District } from '../../branch-management/Model/branch.model';
import { Department } from '../../department/Department-Model/department.model';
import { Employees } from '../Model/employees.model';
import { EmployeeService } from '../service/employee.service';
@Component({
  selector: 'app-advance-salary',
  templateUrl: './advance-salary.component.html',
  styleUrls: ['./advance-salary.component.scss']
})
export class AdvanceSalaryComponent implements OnInit {

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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AdvanceSalaryComponent>, private config: ConfigService, public dialog: MatDialog, private getService: EmployeeService, private router: Router, private formBuilder: FormBuilder) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.retriveForm(this.data.payload)
    this.getData();
    this.getBranch();
    this.getClient();
  }


  retriveForm(item) {
    this.clientForm = this.formBuilder.group({
      branchId: [item.branchId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      departmentId: [item.departmentId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      employeeId: [item.employeeId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      name: [item.name || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      districtId: [item.districtId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      salaryAdvanceAmount: [item.salaryAdvanceAmount || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      advanceDate: [item.advanceDate || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
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
  getClient() {
    var obj = {
      'customerId': this.customerId,
      'districtId': this.districtId
    }
    this.getService.getClient(obj).subscribe((data) => {
      this.clients = data.responseModel;
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
    post.customerId = this.customerId;
    this.getService.advanceSalary(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusCode == 200) {
        Swal.fire({
          icon: "success",
          title: "Advanced Salary  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Advanced Salary Failed",
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
