import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/core/service/congif.service';
import Swal from 'sweetalert2';
import { District } from '../Model/branch.model';
import { BranchService } from '../service/branch.service';
@Component({
  selector: 'app-branch-update',
  templateUrl: './branch-update.component.html',
  styleUrls: ['./branch-update.component.scss']
})
export class BranchUpdateComponent implements OnInit {


  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  branchForm: FormGroup;
  category: District = new District();
  customerId: string;
  districtId: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<BranchUpdateComponent>, private config: ConfigService, public dialog: MatDialog, private getService: BranchService, private router: Router, private formBuilder: FormBuilder) {
    this.config.init();
    this.customerId = config.customerId;
  }
  ngOnInit(): void {
    this.retriveForm(this.data.payload)
  }

  retriveForm(item) {
    this.branchForm = this.formBuilder.group({
      districtName : [item.districtName  || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      address: [item.address || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      phoneNo: [item.phoneNo || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      emailId: [item.emailId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      districtPassword: [item.districtPassword || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    })
    this.districtId=item.districtId
  }
  Update(post: any) {
    this.submitButton.disabled = true;
    post.customerId = this.customerId;
    post.districtId = this.districtId
    this.getService.Update(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusMessage == 'Updated Successfully') {
        Swal.fire({
          icon: "success",
          title: " District Updated Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: " District Update Failed",
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
