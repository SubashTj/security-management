import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfigService } from 'src/app/core/service/congif.service';
import Swal from 'sweetalert2';
import { Inventory } from '../Model/inventory.model';
import { InventoryService } from '../service/inventory.service';
@Component({
  selector: 'app-stock-out-create',
  templateUrl: './stock-out-create.component.html',
  styleUrls: ['./stock-out-create.component.scss']
})
export class StockOutCreateComponent implements OnInit {
  departments: any
  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  inventoryForm: FormGroup;
  public data: any;
  inventory: Inventory[];
  customerId: string;
  districtId: string;
  constructor(private config: ConfigService, public dialogRef: MatDialogRef<StockOutCreateComponent>, public dialog: MatDialog, private getService: InventoryService) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.inventoryForm = new FormGroup({
      stockItemQuantity: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
      inventoryTypeId: new FormControl('', [Validators.required]),
      stockItemId: new FormControl('', [Validators.required]),
      stockInDate: new FormControl('', [Validators.required])
    })

  }
  save(post: any) {
    this.submitButton.disabled = true;
    post.customerId = this.customerId;
    post.districtId = this.districtId
    this.getService.Create(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusMessage == 'Success') {
        Swal.fire({
          icon: "success",
          title: "Stock-Out  Created  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Stock-Out  Create Failed",
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
