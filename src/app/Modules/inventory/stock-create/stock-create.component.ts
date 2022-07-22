import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfigService } from 'src/app/core/service/congif.service';
import Swal from 'sweetalert2';
import { Department } from '../../department/Department-Model/department.model';
import { Inventory } from '../Model/inventory.model';
import { InventoryService } from '../service/inventory.service';
@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.scss']
})
export class StockCreateComponent implements OnInit {
  departments: any
  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  positionForm: FormGroup;
  public data: any;
  inventory: Inventory[];
  customerId: string;
  districtId: string;
  invenorytype: any;
  unittype: any;
  constructor(private config: ConfigService, public dialogRef: MatDialogRef<StockCreateComponent>, public dialog: MatDialog, private getService: InventoryService) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.positionForm = new FormGroup({
      stockItemName: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
      inventoryTypeId: new FormControl('', [Validators.required]),
      unitTypeId: new FormControl('', [Validators.required]),
      stockItemCode: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required])
    })
    this.getData();
    this.getDatas();
  }
  getData() {
    var obj = {
      'customerId': this.customerId,
    }
    this.getService.getInventorytype(obj).subscribe((data) => {
      this.invenorytype = data.responseModel;
    })
  }
  getDatas() {
    var obj = {
      'customerId': this.customerId,
    }
    this.getService.getUnittype(obj).subscribe((data) => {
      this.unittype = data.responseModel;
    })
  }

  save(post: any) {
    this.submitButton.disabled = true;
    post.customerId = this.customerId;
    this.getService.Create(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusCode == 200) {
        Swal.fire({
          icon: "success",
          title: "Stock  Created  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Stock  Create Failed",
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
