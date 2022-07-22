import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/core/service/congif.service';
import { District } from '../Model/branch.model';
import { BranchService } from '../service/branch.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-branch-create',
  templateUrl: './branch-create.component.html',
  styleUrls: ['./branch-create.component.scss']
})
export class BranchCreateComponent implements OnInit {


  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  branchForm: FormGroup;
  public data: any;
  category: District = new District();
  customerId: string;
  constructor(public dialogRef: MatDialogRef<BranchCreateComponent>, public dialog: MatDialog, private getService: BranchService, private router: Router, private config: ConfigService) {
    this.config.init();
    this.customerId = config.customerId;
  }
  ngOnInit(): void {
    this.branchForm = new FormGroup({
      districtName: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
      address: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
      phoneNo: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
      emailId: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
      districtPassword: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
    })
  }
  save(post) {
    this.submitButton.disabled = true;
    post.customerId = this.customerId;
    this.getService.Create(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusMessage == 'Success') {
        Swal.fire({
          icon: "success",
          title: " New District Created  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "District Create Failed",
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
