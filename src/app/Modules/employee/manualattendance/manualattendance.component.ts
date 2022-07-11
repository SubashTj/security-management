import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/core/service/congif.service';
import { Department } from '../../department/Department-Model/department.model';
import { EmployeeService } from '../service/employee.service';
import Swal from 'sweetalert2';
import { District } from '../../branch-management/Model/branch.model';

@Component({
  selector: 'app-manualattendance',
  templateUrl: './manualattendance.component.html',
  styleUrls: ['./manualattendance.component.scss']
})
export class ManualattendanceComponent implements OnInit {
  languageValue: string | undefined;
  resourcesLoaded: boolean = false;

  manualemployeesearch: FormGroup = new FormGroup({

    districtId: new FormControl('', [Validators.required]),
    designationId: new FormControl('', [Validators.required]),
  })
  districtId: string;
  customerId: string;
  departments: Department[];
  departmentId: any;
  MultipleDepartment: any;
  positions: any;
  positionId: any;
  branch: District[];
  portalType: string;

  constructor(private router: Router, private config: ConfigService, private getService: EmployeeService) {
    this.config.init();
    this.customerId = config.customerId;
    this.portalType = config.portalType;
  }
  ngOnInit(): void {
    if (this.portalType == 'admin') {
      this.getBranch();
    } else {
      this.router.navigate([`employee/manualattendance-create/${this.districtId}`])
    }
  }
  btnClick() {
    this.router.navigate([`employee/manualattendance-create/${this.districtId}`]);
  };
  getBranch() {
    var obj = {
      'customerId': this.customerId,
    }
    this.getService.getbranch(obj).subscribe((data) => {
      this.branch = data.responseModel;
      console.log(data)
    })
  }
  onItemSelect(event: any) {
    this.districtId = event.value
  }
  onSelect(event: any) {
    this.positionId = event.value
  }
  updateAttendence(post) {
    post.customerId = this.customerId
    post.districtId = this.districtId
    this.getService.attendence(post).subscribe((res) => {
      if (res.statusMessage == "Success") {
        this.router.navigate([`employee/manualattendance-create`])
        Swal.fire({
          icon: "success",
          title: "Manual Attendance List Show Successfull",
          timer: 2500
        })
      } else {
        Swal.fire({
          icon: "error",
          title: "Manual Attendance List Show Failed",
          timer: 2500

        })
      }
    });
  }
}

