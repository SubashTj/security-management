import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/core/service/congif.service';
import Swal from 'sweetalert2';
import { InventorySettingService } from '../inventory-setting.service';
import { Unit } from '../Model/unittype.model';
@Component({
  selector: 'app-unittype-update',
  templateUrl: './unittype-update.component.html',
  styleUrls: ['./unittype-update.component.scss']
})
export class UnittypeUpdateComponent implements OnInit {

  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  inventoryForm: FormGroup;
  category: Unit = new Unit();
  customerId: string;
  districtId: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<UnittypeUpdateComponent>, private config: ConfigService, public dialog: MatDialog, private getService: InventorySettingService, private router: Router, private formBuilder: FormBuilder) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.retriveForm(this.data.payload)
  }


  retriveForm(item) {
    this.inventoryForm = this.formBuilder.group({

      unitTypeId: [item.unitTypeId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      unitTypeName: [item.unitTypeName || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    })
  }
  Update(post: any) {
    this.submitButton.disabled = true;
    post.customerId = this.customerId;
    this.getService.UpdateUnit(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusCode == 200) {
        Swal.fire({
          icon: "success",
          title: " Unit Type Updated Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: " Unit Type Update Failed",
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
