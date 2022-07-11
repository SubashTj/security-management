import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/core/service/congif.service';
import Swal from 'sweetalert2';
import { ClientsService } from '../clients.service';
import { Clients } from '../Model/clients.model';
@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss']
})
export class ClientCreateComponent implements OnInit {
  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  clientForm: FormGroup;
  public data: any;
  category: Clients = new Clients();
  districtId: string;
  customerId: string;
constructor(    public dialogRef: MatDialogRef<ClientCreateComponent>, public dialog: MatDialog,private getService:ClientsService,private router:Router,private config:ConfigService) {
  this.config.init();
  this.customerId = config.customerId;
  this.districtId = config.districtId;
 }
ngOnInit(): void {
  this.clientForm = new FormGroup({
    branchName: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
    mailId: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
    address: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
    phoneNo: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
  })
}
save(post) {
  this.submitButton.disabled = true;
  post.customerId=this.customerId;
  post.districtId=this.districtId
  this.getService.Create(post).subscribe((res: any) => {
    this.dialogRef.close();
    if (res.statusMessage == 'Success') {
      Swal.fire({
        icon: "success",
        title: " New Branch Created  Successfull",
        timer: 2500
      }).then(function(){
        window.location.reload();
    });
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Branch Create Failed",
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
