import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Department } from '../../department/Department-Model/department.model';
import { DepartmentService } from '../../department/service/department.service';
import { SpecialityService } from '../service/speciality.service';
import Swal from 'sweetalert2';
import { ConfigService } from 'src/app/core/service/congif.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @ViewChild(MatButton) submitButton: MatButton;
  departments: Department[];
  formData = {}
  shiftForm: FormGroup;
  public data: any;
  department: Department = new Department();
  customerId: string;
  hospitalId: any;
  districtId: string;
  constructor(private config: ConfigService, public dialogRef: MatDialogRef<CreateComponent>, private router: Router, public dialog: MatDialog, private dataService: SpecialityService) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }

  ngOnInit(): void {
    this.shiftForm = new FormGroup({
      departmentId: new FormControl('', [Validators.required]),
      speciality: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),

    })
    this.getData();
  }
  getData() {
    var obj = {
      'customerId': this.customerId
    }
    this.dataService.getDepartment(obj).subscribe((data) => {
      this.departments = data.responseModel;
      console.log(data)
    })
  }
  save(post) {
    this.submitButton.disabled = true;
    post.customerId = this.customerId
    post.districtId = this.districtId
    this.dataService.create(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusMessage == 'Success') {
        Swal.fire({
          icon: "success",
          title: "Speciality Created  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Speciality Create Failed",
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
