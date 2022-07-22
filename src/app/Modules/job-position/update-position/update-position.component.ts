import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Positions } from '../Model/positions.model';
import { PositionService } from '../service/position.service';
import Swal from 'sweetalert2';
import { ConfigService } from 'src/app/core/service/congif.service';
@Component({
  selector: 'app-update-position',
  templateUrl: './update-position.component.html',
  styleUrls: ['./update-position.component.scss']
})
export class UpdatePositionComponent implements OnInit {
  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  positionForm: FormGroup;
  category: Positions = new Positions();
  department: any;
  customerId: string;
  districtId: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<UpdatePositionComponent>, public dialog: MatDialog, private getService: PositionService, private router: Router, private formBuilder: FormBuilder, private config: ConfigService) {
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
    this.positionForm = this.formBuilder.group({
      designationId: [item.designationId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      designation: [item.designation || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      departmentId: [item.departmentId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    })
  }
  Update(post: any) {
    this.submitButton.disabled = true;
    post.customerId = this.customerId;
    post.districtId = this.districtId
    this.getService.update(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusMessage == 'Success') {
        Swal.fire({
          icon: "success",
          title: "Designation  Updated  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Designation  Updated Failed",
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
