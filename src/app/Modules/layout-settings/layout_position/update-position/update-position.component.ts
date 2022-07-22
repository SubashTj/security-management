import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from '../../Model/category.model';
import { LayoutService } from '../../service/layout.service';
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
  layoutForm: FormGroup;
  category: Category = new Category();
  dataSource: Category[];
  customerId: string;
  districtId: string;
  departments: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private config: ConfigService, public dialogRef: MatDialogRef<UpdatePositionComponent>, public dialog: MatDialog, private getService: LayoutService, private router: Router, private formBuilder: FormBuilder) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.retriveForm(this.data.payload)
    this.getDep();
    this.getData();
  }
  getData() {
    var obj = {
      'customerId': this.customerId,
      'districtId': this.districtId
    }
    this.getService.getLayout(obj).subscribe((data) => {
      this.dataSource = (data.responseModel);
      console.log(data)
    })
  }
  getDep() {
    var obj = {
      'customerId': this.customerId
    }
    this.getService.getDepartment(obj).subscribe((data) => {
      this.departments = data.responseModel;
      console.log(data)
    })
  }
  retriveForm(item) {
    this.layoutForm = this.formBuilder.group({

      positionId: [item.positionId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      layoutPositionName: [item.layoutPositionName || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      positionShortName: [item.positionShortName || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      layoutCategoryName: [item.layoutCategoryName || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      layoutId: [item.layoutId || '', [Validators.required]],
    })
  }
  Update(post: any) {

    this.submitButton.disabled = true;
    post.customerId = this.customerId
    post.districtId = this.districtId
    this.getService.Update(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusMessage == 'Success') {
        Swal.fire({
          icon: "success",
          title: " Layout-Position Updated  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Layout-Position Updated Failed",
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
