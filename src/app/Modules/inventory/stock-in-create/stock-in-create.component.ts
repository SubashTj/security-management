import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfigService } from 'src/app/core/service/congif.service';
import Swal from 'sweetalert2';
import { Inventory } from '../Model/inventory.model';
import { InventoryService } from '../service/inventory.service';
interface Direction {
  stockDirection: string;
}
@Component({
  selector: 'app-stock-in-create',
  templateUrl: './stock-in-create.component.html',
  styleUrls: ['./stock-in-create.component.scss']
})
export class StockInCreateComponent implements OnInit {
  directions: Direction[] = [
    { stockDirection: 'In' },
    { stockDirection: 'Out' },
  ]
  departments: any
  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  inventoryForm: FormGroup;
  public data: any;
  inventory: Inventory[];
  customerId: string;
  districtId: string;
  invenorytype: Inventory[];
  stock: any;
  constructor(private config: ConfigService, public dialogRef: MatDialogRef<StockInCreateComponent>, public dialog: MatDialog, private getService: InventoryService) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.inventoryForm = new FormGroup({
      quantity: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
      inventoryTypeId: new FormControl('', [Validators.required]),
      inventoryStockItemId: new FormControl('', [Validators.required]),
      stockDirection: new FormControl('', [Validators.required]),
      stockEntryDate: new FormControl('', [Validators.required])
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
    this.getService.getStock(obj).subscribe((data) => {
      this.stock = data.responseModel;
    })
  }
  save(post: any) {
    this.submitButton.disabled = true;
    post.customerId = this.customerId;
    this.getService.CreateEntry(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusCode == 200) {
        Swal.fire({
          icon: "success",
          title: "Stock-In  Created  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Stock-In  Create Failed",
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
