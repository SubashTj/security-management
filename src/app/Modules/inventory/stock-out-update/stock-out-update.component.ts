import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfigService } from 'src/app/core/service/congif.service';
import Swal from 'sweetalert2';
import { Inventory } from '../Model/inventory.model';
import { InventoryService } from '../service/inventory.service';
@Component({
  selector: 'app-stock-out-update',
  templateUrl: './stock-out-update.component.html',
  styleUrls: ['./stock-out-update.component.scss']
})
export class StockOutUpdateComponent implements OnInit {
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
  constructor(private config: ConfigService, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public dialogRef: MatDialogRef<StockOutUpdateComponent>, private modelService: InventoryService, private formBuilder: FormBuilder) {
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.retriveForm(this.data.payload)
    // this.getData();
  }
  retriveForm(item) {
    this.inventoryForm = this.formBuilder.group({

      stockItemId: [item.stockItemId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      stockItemQuantity: [item.stockItemQuantity || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      inventoryTypeId: [item.inventoryTypeId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      stockOutDate: [item.stockInDate || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
    })
  }
  Update(post: any) {

    this.modelService.Update(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusMessage == 'Success') {
        Swal.fire({
          icon: "success",
          title: "Stock-Out Updated  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Stock-Out Updated Failed",
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
