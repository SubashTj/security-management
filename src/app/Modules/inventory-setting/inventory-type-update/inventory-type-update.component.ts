import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/core/service/congif.service';
import Swal from 'sweetalert2';
import { InventorySettingService } from '../inventory-setting.service';
import { InventoryType } from '../Model/inventory-type.model';
@Component({
  selector: 'app-inventory-type-update',
  templateUrl: './inventory-type-update.component.html',
  styleUrls: ['./inventory-type-update.component.scss']
})
export class InventoryTypeUpdateComponent implements OnInit {

  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  inventoryForm: FormGroup;
  category: InventoryType = new InventoryType();
  customerId: string;
  districtId: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<InventoryTypeUpdateComponent>, private config: ConfigService, public dialog: MatDialog, private getService: InventorySettingService, private router: Router, private formBuilder: FormBuilder) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.retriveForm(this.data.payload)
  }


  retriveForm(item) {
    this.inventoryForm = this.formBuilder.group({

      inventoryTypeId: [item.inventoryTypeId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      inventoryTypeName: [item.inventoryTypeName || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    })
  }
  Update(post) {
    this.submitButton.disabled = true;
    post.customerId = this.customerId;
    this.getService.Update(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusCode == 200) {
        Swal.fire({
          icon: "success",
          title: " Inventory Type Updated Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: " Inventory Type Update Failed",
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
