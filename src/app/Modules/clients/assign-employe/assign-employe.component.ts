import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/core/service/congif.service';
import Swal from 'sweetalert2';
import { District } from '../../branch-management/Model/branch.model';
import { Department } from '../../department/Department-Model/department.model';
import { Employees } from '../../employee/Model/employees.model';
import { ClientsService } from '../clients.service';
import { Clients } from '../Model/clients.model';
@Component({
  selector: 'app-assign-employe',
  templateUrl: './assign-employe.component.html',
  styleUrls: ['./assign-employe.component.scss']
})
export class AssignEmployeComponent implements OnInit {

  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  clientForm: FormGroup;
  category: Clients = new Clients();
  customerId: string;
  districtId: string;
  departments: Department[];
  employee: any;
  MultipleDepartment: any = [];
  employeeId = []
  branches: District[];
  departmentId: string;
  departmentIds = []
  departmentModel = {}
  employeeDepartment: string;
  selectemployee: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AssignEmployeComponent>, private config: ConfigService, public dialog: MatDialog, private getService: ClientsService, private router: Router, private formBuilder: FormBuilder) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId
  }
  ngOnInit(): void {
    this.retriveForm(this.data.payload)
    this.getData();
    this.getBranch();

  }


  retriveForm(item) {
    this.clientForm = this.formBuilder.group({
      branchId: [item.branchId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      branchName: [item.branchName || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      mailId: [item.mailId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      phoneNo: [item.phoneNo || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      departmentId: [item.departmentId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      branchesId: [item.branchesId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      employeeId: [item.employeeId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      branchDistrictId: [item.branchDistrictId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    })
  }
  getData() {
    var obj = {
      'customerId': this.customerId,
    }
    this.getService.getDepartment(obj).subscribe((data) => {
      this.departments = data.responseModel;
      console.log(data)
    })
  }
  getDep() {
    var obj = {
      'customerId': this.customerId
    }

  }

  onItemSelect(event: any) {
    this.districtId = event.value
    var obj = {
      'customerId': this.customerId,
      'districtId': this.districtId,
    }
    this.getService.getList(obj).subscribe((data) => {
      this.employee = data.responseModel;
      console.log(data)

    });
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
  onDepartmentSelect(event: any, department: Department) {
    this.departmentId = (department.departmentId)
    this.MultipleDepartment.push(department.departmentId);
    if (event.source.selected == true) {
      this.departmentModel = {
        'departmentId': this.departmentId,
        'employeeId': this.employeeId
      }
      this.departmentIds.push(this.departmentModel)
    }
    else {
      this.departmentIds.splice(this.departmentIds.indexOf(this.departmentId), 1)
    }
    var obj = {
      'departmentId': this.MultipleDepartment,
      'customerId': this.customerId,
      'districtId': this.districtId
    }
    this.getService.getList(obj).subscribe((data) => {
      this.employee = data.responseModel;
    })
  }
  onEmployeeChange(event: any, position: Employees) {
    this.employeeDepartment = position.departmentId
    this.selectemployee = position.employeeId

    this.departmentIds.map(element => {
      let data;
      if (event.source.selected == true) {
        if (element.departmentId == position.departmentId) {
          if (element.employeeId == 0) {
            data = [];
          }
          else {
            data = element.employeeId;
          }
          data.push(position.employeeId);
          element.employeeId = data;
        }
      } else if (element.departmentId == position.departmentId) {
        element.employeeId.splice(element.employeeId.indexOf(position.employeeId), 1)
      }
      console.log(this.departmentIds)
    });
  }
  Update(post: any) {
    this.submitButton.disabled = true;
    post.customerId = this.customerId;
    post.districtId = this.districtId;
    post.departmentIds = this.departmentIds;
    this.getService.employeeAssign(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusMessage == 'Success') {
        Swal.fire({
          icon: "success",
          title: "Employee Assigned  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Employee Assigned Failed",
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
