import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Qualification } from '../Model/qualification.model';
import { QualificationRoutingModule } from '../qualification-routing.module';
import { QualificationService } from '../service/qualification.service';
import Swal from 'sweetalert2';
import { ConfigService } from 'src/app/core/service/congif.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @ViewChild(MatButton) submitButton: MatButton;
  public data: any;
  formData = {}
  qualificationForm: FormGroup;
  qualifications: Qualification = new Qualification();
  customerId: string;
  districtId: string;
  constructor( private config:ConfigService,public dialogRef: MatDialogRef<CreateComponent>,public dialog: MatDialog,private router:Router,private dataService:QualificationService) { 
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
   }
  ngOnInit(): void {
    this.qualificationForm = new FormGroup({
      qualification: new FormControl('', [Validators.required]),
    })
  }
  save(action:string){
    this.submitButton.disabled = true;
  this.qualifications.customerId=this.customerId
    this.dataService.create(this.qualifications).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusMessage == 'Success') {
        Swal.fire({
          icon: "success",
          title: "Qualification Created  Successfull",
          timer: 2500
        }).then(function(){
          window.location.reload();
      });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Qualification Create Failed",
          timer: 2500
      
        }).then(function(){
          // window.location.reload();
      });
        
      }

    });
  }
  discard() {
    this.dialogRef.close()
  }
}
