import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/core/service/congif.service';
import { InventorySettingService } from '../inventory-setting.service';
import { InventoryType } from '../Model/inventory-type.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-inventory-type-create',
  templateUrl: './inventory-type-create.component.html',
  styleUrls: ['./inventory-type-create.component.scss']
})
export class InventoryTypeCreateComponent implements OnInit {
  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  inventoryForm: FormGroup;
  public data: any;
  inventory: InventoryType = new InventoryType();
  customerId: string;
  districtId: string;
  constructor(public dialogRef: MatDialogRef<InventoryTypeCreateComponent>, public dialog: MatDialog, private dataService: InventorySettingService, private router: Router, private config: ConfigService) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.inventoryForm = new FormGroup({
      inventoryTypeName: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
    })
  }
  save(action: string) {
    this.submitButton.disabled = true;
    this.inventory.customerId = this.customerId
    this.dataService.Create(this.inventory).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusCode == 200) {
        this.dataService.recordAddedSubject.next(res.responseModel);
        if (action == 'new') {
          this.inventoryForm.reset();
        } else {
          this.dialogRef.close(true);
          this.router.navigate([`/inventory/list`]);
        }
        Swal.fire({
          icon: "success",
          title: " InventoryType Created  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: " InventoryType Create Failed",
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
