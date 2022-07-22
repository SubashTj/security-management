import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Department } from '../Department-Model/department.model';
import { DepartmentService } from '../service/department.service';
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
  departmentForm: FormGroup;
  public data: any;
  department: Department = new Department();
  customerId: string;
  constructor(public dialogRef: MatDialogRef<CreateComponent>, public dialog: MatDialog, private dataService: DepartmentService, private router: Router, private config: ConfigService) {
    this.config.init();
    this.customerId = config.customerId;
  }
  ngOnInit(): void {
    this.departmentForm = new FormGroup({
      departmentName: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
    })
  }
  save(action: string) {
    this.submitButton.disabled = true;
    this.department.customerId = this.customerId
    this.dataService.create(this.department).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusMessage == 'Success') {
        this.dataService.recordAddedSubject.next(res.responseModel);
        if (action == 'new') {
          this.departmentForm.reset();
        } else {
          this.dialogRef.close(true);
          this.router.navigate([`/department/list`]);
        }
        Swal.fire({
          icon: "success",
          title: " Department Created  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: " Department Create Failed",
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
