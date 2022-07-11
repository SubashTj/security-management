import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/core/service/congif.service';
import Swal from 'sweetalert2';
import { ClientsService } from '../clients.service';
import { Clients } from '../Model/clients.model';
@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.scss']
})
export class ClientUpdateComponent implements OnInit {

  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  clientForm: FormGroup;
  category: Clients = new Clients();
  customerId: string;
  districtId: string;
constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<ClientUpdateComponent>,private config:ConfigService, public dialog: MatDialog,private getService:ClientsService,private router:Router, private formBuilder: FormBuilder) { 
  this.config.init();
  this.customerId = config.customerId;
  this.districtId = config.districtId;
}
ngOnInit(): void {
  this.retriveForm(this.data.payload)
} 


retriveForm(item) {
  this.clientForm = this.formBuilder.group({
    branchId: [item.branchId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    branchName: [item.branchName || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    mailId: [item.mailId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    address: [item.address || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    phoneNo: [item.phoneNo || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],

  })
}
Update(post:any) {
  this.submitButton.disabled = true;
  post.customerId=this.customerId;
  post.districtId=this.districtId
  this.getService.Update(post).subscribe((res: any) => {
    this.dialogRef.close();
    if (res.statusMessage == 'Updated Successfully') {
      Swal.fire({
        icon: "success",
        title: "  Branch Updated  Successfull",
        timer: 2500
      }).then(function(){
        window.location.reload();
    });
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Branch Update Failed",
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
