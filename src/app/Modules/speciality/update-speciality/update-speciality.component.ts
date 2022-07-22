import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Speciality } from '../Model/speciality.model';
import { SpecialityService } from '../service/speciality.service';
import Swal from 'sweetalert2';
import { ConfigService } from 'src/app/core/service/congif.service';
@Component({
  selector: 'app-update-speciality',
  templateUrl: './update-speciality.component.html',
  styleUrls: ['./update-speciality.component.scss']
})
export class UpdateSpecialityComponent implements OnInit {
  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  shiftForm: FormGroup;
  category: Speciality = new Speciality();
  department: any;
  customerId: string;
  districtId: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private config: ConfigService, public dialogRef: MatDialogRef<UpdateSpecialityComponent>, public dialog: MatDialog, private getService: SpecialityService, private router: Router, private formBuilder: FormBuilder) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.retriveForm(this.data.payload)
    this.getData();
  }

  getData() {
    var obj = {
      'customerId': this.customerId
    }
    this.getService.getDepartment(obj).subscribe((data) => {
      this.department = data.responseModel;
      console.log(data)
    })
  }
  retriveForm(item) {
    this.shiftForm = this.formBuilder.group({
      specialityId: [item.specialityId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      speciality: [item.speciality || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      departmentId: [item.departmentId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],


    })
  }
  Update(post: any) {
    this.submitButton.disabled = true;
    post.customerId = this.customerId
    post.districtId = this.districtId
    this.getService.update(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusMessage == 'Success') {
        Swal.fire({
          icon: "success",
          title: "Speciality Updated  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Speciality Updated Failed",
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
