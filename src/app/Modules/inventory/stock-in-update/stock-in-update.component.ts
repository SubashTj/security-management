import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfigService } from 'src/app/core/service/congif.service';
import Swal from 'sweetalert2';
import { Inventory } from '../Model/inventory.model';
import { InventoryService } from '../service/inventory.service';
interface Direction {
  stockDirection: string;
}
@Component({
  selector: 'app-stock-in-update',
  templateUrl: './stock-in-update.component.html',
  styleUrls: ['./stock-in-update.component.scss']
})
export class StockInUpdateComponent implements OnInit {
  directions: Direction[] = [
    { stockDirection: 'In' },
    { stockDirection: 'Out' },
  ]
  formData = {}
  console = console;
  item: Inventory = new Inventory();
  inventoryForm: FormGroup;
  departments: any
  @ViewChild(MatButton) submitButton: MatButton;
  selectedValue: string;
  selectedCar: string;
  inventory: any;
  customerId: string;
  districtId: string;
  invenorytype: Inventory[];
  stockEntryId: any;
  stock: any;
  constructor(private config: ConfigService, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public dialogRef: MatDialogRef<StockInUpdateComponent>, private modelService: InventoryService, private formBuilder: FormBuilder) {
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.retriveForm(this.data.payload)
    this.getData();
    this.getDatas();
    // this.getData();
  }
  retriveForm(item) {
    this.inventoryForm = this.formBuilder.group({
      stockEntryId: [item.stockEntryId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      inventoryStockItemId: [item.inventoryStockItemId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      inventoryTypeId: [item.inventoryTypeId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      quantity: [item.quantity || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      stockDirection: [item.stockDirection || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      stockEntryDate: [item.stockEntryDate || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    })
    this.stockEntryId = item.stockEntryId
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
    this.modelService.getStock(obj).subscribe((data) => {
      this.stock = data.responseModel;
    })
  }
  Update(post: any) {
    post.customerId = this.customerId
    post.stockEntryId = this.stockEntryId
    this.modelService.UpdateEntry(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusCode == 200) {
        Swal.fire({
          icon: "success",
          title: "Stock-In-Out Updated  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Stock-In-Out Updated Failed",
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
