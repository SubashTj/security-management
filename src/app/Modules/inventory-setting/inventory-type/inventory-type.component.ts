import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { constant } from 'src/app/core/helpers/global.helper';
import { AppLoaderService } from 'src/app/core/service/app-loader.service';
import { ConfigService } from 'src/app/core/service/congif.service';
import Swal from 'sweetalert2';
import { PaginationDTO } from '../../model/paginationDTO';
import { InventorySettingService } from '../inventory-setting.service';
import { InventoryTypeCreateComponent } from '../inventory-type-create/inventory-type-create.component';
import { InventoryTypeUpdateComponent } from '../inventory-type-update/inventory-type-update.component';
import { InventoryType } from '../Model/inventory-type.model';
@Component({
  selector: 'app-inventory-type',
  templateUrl: './inventory-type.component.html',
  styleUrls: ['./inventory-type.component.scss']
})
export class InventoryTypeComponent implements OnInit {

  displayedColumns: string[] = [
    "select",
    "inventoryTypeName",
    "activeStatus",
  ];
  dataSource = new MatTableDataSource<InventoryType>();
  paginationDTO: PaginationDTO = new PaginationDTO();
  selection = new SelectionModel<InventoryType>(true, []);
  pageSizeOptions: any = 0;
  responseModel: any;
  value = "";
  customerId: string;
  districtId: string;
  currentPageDataSize: number = 0;
  offset: number;
  limit: number;
  recordAddedSub: Subscription;
  recordUpdatedSub: Subscription;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filterInput") filter: ElementRef;
  inventoryTypeId: string;
  inventory: InventoryType;

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  isMultiStatus(status: string) {
    const others = this.getCheckedValue().filter(rol => {
      if (rol.activeStatus != status) {
        return rol;
      }
    });
    return others.length > 0;
  }
  getCheckedValue(): InventoryType[] {
    let transList: InventoryType[] = [];
    this.dataSource.connect().value.forEach((trans) => {
      if (this.selection.isSelected(trans)) transList.push(trans);
    });
    return transList;
  }
  checkboxLabel(row?: InventoryType): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.inventoryTypeId + 1}`;
  }
  constructor(public config: ConfigService, public dialog: MatDialog, private getService: InventorySettingService, private loader: AppLoaderService) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
    this.pageSizeOptions = constant().app.table.filtering.pageSizeOptions;
    this.paginationDTO = new PaginationDTO();
    this.offset = this.paginationDTO.offset
    this.limit = this.paginationDTO.limit
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getData();
  }
  ngAfterViewInit() {
    this.addSub();
    this.updateSub();
    this.dataSource.sort = this.sort;
  }
  ngOnDestroy() {
    this.recordAddedSub.unsubscribe();
    this.recordUpdatedSub.unsubscribe();
  }
  private refreshTable(actionType) {
    //reset the filter element
    this.filter.nativeElement.value = "";
    this.value = "";


    this.paginationDTO.offset = this.paginator.pageIndex

    this.paginationDTO.limit = this.paginator.pageSize;

    this.paginationDTO.totalSize = this.paginator.length;


    if (actionType == 'add') {
      this.paginationDTO.offset = 0;
    }

    if (actionType == 'delete') {
      if (this.getCheckedValue().length == this.currentPageDataSize) {
        this.paginationDTO.offset = this.paginator.pageIndex > 0 ? this.paginator.pageIndex - 1 : 0;
      }
    }
    this.getData()
    this.paginator.pageIndex = this.paginationDTO.offset;
    this.paginator.pageSize = this.paginationDTO.limit;
    this.paginator.length = this.paginationDTO.totalSize;
    //clear selection
    this.selection = new SelectionModel<InventoryType>(true, []);

    // Refreshing table using paginator

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.paginationDTO.searchWith = filterValue;
    this.getData();
  }
  onPaginateChange(event) {
    this.offset = event.pageIndex;
    this.limit = event.pageSize;
    this.getData();
  }
  Filter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getData() {
    var obj = {
      'limit': this.limit,
      'offset': this.offset,
      'customerId': this.customerId,
    }
    this.getService.getList(obj).subscribe((data) => {
      this.paginationDTO.totalSize = data.pageSize;
      this.currentPageDataSize = data.responseModel.length;
      this.dataSource = new MatTableDataSource<InventoryType>(data.responseModel);
      this.dataSource.sort = this.sort;
    })
  }
  addSub() {
    this.recordAddedSub = this.getService
      .getRecordAddedSub()
      .subscribe((responseModel) => {
        let dept = responseModel[0];
        let pid = dept?.inventoryTypeId ?? 0;
        if (pid > 0) {
          this.refreshTable('add');
        }
      });
  }

  updateSub() {
    this.recordUpdatedSub = this.getService
      .getRecordUpdatedSub()
      .subscribe((responseModel) => {
        let dept = responseModel[0];
        let pid = dept?.inventoryTypeId ?? 0;


        if (pid > 0) {
          this.refreshTable('edit');
        }
      });
  }

  create() {
    const dialogRef = this.dialog.open(InventoryTypeCreateComponent, {
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.sort = this.sort;
      }
    });
  }
  action(option) {
    if (this.getCheckedValue().length == 1) {
      Swal.fire({
        title: 'Confirm?',
        text: "Are you sure? You want to " + option + " !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, ' + option + ' it!'
      }).then((result) => {
        if (result.value) {
          this.inventory = this.getCheckedValue()[0];
          const dialogRef = this.dialog.open(InventoryTypeUpdateComponent, {
            disableClose: true,
            data: { payload: this.inventory },
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              this.dataSource.sort = this.sort;
            }
          });
        } else {
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Update Inventory-Type",
        text: "Please Select One Inventory-Type!",
      });
    }
  }
  Delete(option) {
    {
      if (this.getCheckedValue().length >= 1) {
        Swal.fire({
          title: 'Confirm?',
          text: "Are you sure? You want to " + option + " !",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, ' + option + ' it!'
        }).then((result) => {
          if (result.value) {

            let inventoryTypeId = [];
            this.getCheckedValue().forEach(item => {
              inventoryTypeId.push(item.inventoryTypeId)
            })
            let obj = {
              'customerId': this.customerId,
              'deletedId': inventoryTypeId,
            }
            this.getService.Delete(obj).subscribe((data) => {
              Swal.fire({
                icon: "success",
                title: "Deleted Inventory-Type Successfull",
                timer: 2500
              }).then(function () {
                window.location.reload();
              });

            })
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Delete Inventory-Type",
          text: "Please Select One Inventory-Type !",
        });
      }
    }
  }
  setStaus(activeStatus: number) {
    let lblAction = '';
    if (activeStatus == 1) {
      lblAction = 'active';
    }
    else if (activeStatus == 0) {
      lblAction = 'Inactive';
    }

    if (this.getCheckedValue().length >= 1) {
      let oppStatus = activeStatus == 1 ? 0 : 1;
      if (activeStatus == 2) {
        this.statusAlert(lblAction, activeStatus);
      } else if (this.getCheckedValue()[0].activeStatus == '3') {
        Swal.fire({
          icon: 'error',
          title: 'Inventory-Type Status',
          text: 'Inventory-Type registration incompleted so can not ' + lblAction + '!',
        })
      }
      else if (!this.isMultiStatus(String(oppStatus))) {
        this.statusAlert(lblAction, activeStatus);
      } else {
        let opplblAction = activeStatus == 1 ? 'active' : 'Inactive';
        Swal.fire({
          icon: 'error',
          title: 'Inventory-Type Status',
          text: 'Please select the ' + opplblAction + ' status of the Inventory-Type!',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: activeStatus == 2 ? 'Delete Inventory-Type' : 'Change Inventory-Type Status',
        text: 'Please Select Altleast One Inventory-Type!',
      });
    }
  }
  statusAlert(lblAction: string, activeStatus) {
    Swal.fire({
      title: 'Confirm?',
      text: "Are you sure? You want to " + lblAction + " it !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, ' + lblAction + ' it!'
    }).then((result) => {
      if (result.value) {
        this.saveStatus(activeStatus);
      }
    });
  }
  saveStatus(activeStatus) {
    let ids = [];
    this.getCheckedValue().forEach(item => {
      ids.push(item.inventoryTypeId)
      this.inventoryTypeId = item.inventoryTypeId
    })
    let obj = {
      'activeStatus': activeStatus,
      'customerId': this.customerId,
      'inventoryTypeId': ids,
    }
    this.getService.status(obj).subscribe((res) => {
      if (res.statusMessage == 'Success') {
        Swal.fire({
          icon: "success",
          title: " Inventory-Type Status Changed Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: " Inventory-Type Status Change Failed",
          timer: 2500

        }).then(function () {
          window.location.reload();
        });

      }

    });
  }
}
