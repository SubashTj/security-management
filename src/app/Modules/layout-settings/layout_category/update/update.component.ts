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
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  layoutForm: FormGroup;
  category: Category = new Category();
  customerId: string;
  districtId: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<UpdateComponent>, public dialog: MatDialog, private getService: LayoutService, private router: Router, private formBuilder: FormBuilder, private config: ConfigService) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.retriveForm(this.data.payload)
  }


  retriveForm(item) {
    this.layoutForm = this.formBuilder.group({
      layoutId: [item.layoutId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      layoutCategoryName: [item.layoutCategoryName || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
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
          title: " Layout-Category Updated  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Layout-Category Updated Failed",
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
