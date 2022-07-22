import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from '../../Model/category.model';
import { LayoutService } from '../../service/layout.service';
import Swal from 'sweetalert2';
import { ConfigService } from 'src/app/core/service/congif.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  layoutForm: FormGroup;
  public data: any;
  category: Category = new Category();
  customerId: string;
  districtId: string;
  constructor(private config: ConfigService, public dialogRef: MatDialogRef<CreateComponent>, public dialog: MatDialog, private getService: LayoutService, private router: Router) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.layoutForm = new FormGroup({
      layoutCategoryName: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
    })
  }
  save(post) {
    this.submitButton.disabled = true;
    post.customerId = this.customerId
    post.districtId = this.districtId
    this.getService.create(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusMessage == 'Success') {
        Swal.fire({
          icon: "success",
          title: " Layout-Category Created  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Layout-Category Create Failed",
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
