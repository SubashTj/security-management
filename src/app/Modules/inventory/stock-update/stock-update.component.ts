import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigService } from 'src/app/core/service/congif.service';
import { Inventory } from '../Model/inventory.model';
import Swal from 'sweetalert2';
import { InventoryService } from '../service/inventory.service';
@Component({
  selector: 'app-stock-update',
  templateUrl: './stock-update.component.html',
  styleUrls: ['./stock-update.component.scss']
})
export class StockUpdateComponent implements OnInit {
  departments: any
  formData = {}
  console = console;
  item: Inventory = new Inventory();
  inventoryForm: FormGroup;

  @ViewChild(MatButton) submitButton: MatButton;
  selectedValue: string;
  selectedCar: string;
  inventory: any;
  customerId: string;
  districtId: string;
  unittype: Inventory[];
  invenorytype: Inventory[];
  inventoryStockItemId: any;
  constructor(private config: ConfigService, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public dialogRef: MatDialogRef<StockUpdateComponent>, private modelService: InventoryService, private formBuilder: FormBuilder) {
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.retriveForm(this.data.payload)
  }
  retriveForm(item) {
    this.inventoryForm = this.formBuilder.group({

      stockItemName: [item.stockItemName || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      inventoryStockItemId: [item.inventoryStockItemId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      inventoryTypeId: [item.inventoryTypeId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      unitTypeId: [item.unitTypeId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      stockItemCode: [item.stockItemCode || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      quantity: [item.quantity || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    })
    this.inventoryStockItemId = item.inventoryStockItemId
    this.getData();
    this.getDatas();
  }
  getData() {
    var obj = {
      'customerId': this.customerId,
    }
    this.modelService.getInventorytype(obj).subscribe((data) => {
      this.invenorytype = data.responseModel;
    })
  }
  getDatas() {
    var obj = {
      'customerId': this.customerId,
    }
    this.modelService.getUnittype(obj).subscribe((data) => {
      this.unittype = data.responseModel;
    })
  }
  Update(post: any) {
    post.customerId = this.customerId
    post.inventoryStockItemId = this.inventoryStockItemId
    this.modelService.Update(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusCode == 200) {
        Swal.fire({
          icon: "success",
          title: "Stock Updated  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Stock Updated Failed",
          timer: 2500

        }).then(function () {
          window.location.reload();
        });

      }
    });
  }

  // getData() {
  //   var obj = {
  //     'customerId': this.customerId,
  //     'districtId': this.districtId
  //   }
  //   this.modelService.getData(obj).subscribe((data) => {
  //     this.inventory =data.responseModel;
  //   });
  // }
  save(action: string) { }
  discard() {
    this.dialogRef.close(true)
  }

}
