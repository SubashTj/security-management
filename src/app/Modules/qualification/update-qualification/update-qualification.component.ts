import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Qualification } from '../Model/qualification.model';
import { QualificationService } from '../service/qualification.service';
import Swal from 'sweetalert2';
import { ConfigService } from 'src/app/core/service/congif.service';
@Component({
  selector: 'app-update-qualification',
  templateUrl: './update-qualification.component.html',
  styleUrls: ['./update-qualification.component.scss']
})
export class UpdateQualificationComponent implements OnInit {
  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  qualificationForm: FormGroup;
  category: Qualification = new Qualification();
  customerId: string;
  districtId: string;
constructor(@Inject(MAT_DIALOG_DATA) public data: any,private config:ConfigService,public dialogRef: MatDialogRef<UpdateQualificationComponent>, public dialog: MatDialog,private getService:QualificationService,private router:Router, private formBuilder: FormBuilder) {
  this.config.init();
  this.customerId = config.customerId;
  this.districtId = config.districtId;
 }
ngOnInit(): void {
  this.retriveForm(this.data.payload)
} 


retriveForm(item) {
  this.qualificationForm = this.formBuilder.group({
    qualificationId: [item.qualificationId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    qualification: [item.qualification || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
  })
}
Update(post:any) {
  this.submitButton.disabled = true;
  post.customerId=this.customerId
  post.districtId=this.districtId
  this.getService.update(post).subscribe((res: any) => {
    this.dialogRef.close();
    if (res.statusMessage == 'Success') {
      Swal.fire({
        icon: "success",
        title: "Qualification Updated  Successfull",
        timer: 2500
      }).then(function(){
        window.location.reload();
    });
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Qualification Updated Failed",
        timer: 2500
    
      }).then(function(){
        window.location.reload();
    });
      
    }
  });
}
discard() {
  this.dialogRef.close()
}

}
