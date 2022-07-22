import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { constant } from 'src/app/core/helpers/global.helper';
import { AppLoaderService } from 'src/app/core/service/app-loader.service';
import { ConfigService } from 'src/app/core/service/congif.service';
import Swal from 'sweetalert2';
import { PaginationDTO } from '../../model/paginationDTO';
import { Inventory } from '../Model/inventory.model';
import { InventoryService } from '../service/inventory.service';
import { StockOutCreateComponent } from '../stock-out-create/stock-out-create.component';
import { StockOutUpdateComponent } from '../stock-out-update/stock-out-update.component';
@Component({
  selector: 'app-stock-out',
  templateUrl: './stock-out.component.html',
  styleUrls: ['./stock-out.component.scss']
})
export class StockOutComponent implements OnInit {

  pageSizeOptions: any = 0;
  displayedColumns: string[] = [
    "select",
    "stockItemId",
    "stockItemName",
    "inventoryName",
    "stockOutDate",
    "stockItemQuantity",
    "activeStatus",];
  dataSource = new MatTableDataSource<Inventory>();
  paginationDTO: PaginationDTO = new PaginationDTO();
  selection = new SelectionModel<Inventory>(true, []);
  inventoryStockItemId: string;
  Stock: any;
  value = "";
  customerId: string;
  districtId: string;
  isLoading: boolean = false
  currentPageDataSize: number = 0;
  offset: number;
  limit: number;
  isShowing: boolean = false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filterInput") filter: ElementRef;
  branch: any;
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }


  getCheckedValue(): Inventory[] {
    let transList: Inventory[] = [];
    this.dataSource.connect().value.forEach((trans) => {
      if (this.selection.isSelected(trans)) transList.push(trans);
    });
    return transList;
  }
  isMultiStatus(status: string) {
    const others = this.getCheckedValue().filter(rol => {
      if (rol.activeStatus != status) {
        return rol;
      }
    });
    return others.length > 0;
  }
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Inventory): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.inventoryStockItemId + 1}`;
  }
  constructor(public dialog: MatDialog, private getService: InventoryService, private config: ConfigService, private loader: AppLoaderService) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
    if (config.portalType == 'admin') {
      this.isShowing = true
    } else {
      this.districtId = config.districtId;
      this.isShowing = false
    }
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
    this.dataSource.sort = this.sort;
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
    this.selection = new SelectionModel<Inventory>(true, []);

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
      'districtId': this.districtId
    }
    this.getService.getDetail(obj).subscribe((data) => {
      this.paginationDTO.totalSize = data.pageSize;
      this.currentPageDataSize = data.responseModel.length;
      this.dataSource = new MatTableDataSource<Inventory>(data.responseModel);
      this.dataSource.sort = this.sort;
      console.log(data)
    })
  }
  create() {
    const dialogRef = this.dialog.open(StockOutCreateComponent, {
      disableClose: true,
    });
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
            let inventoryStockItemId = [];
            this.getCheckedValue().forEach(item => {
              inventoryStockItemId.push(item.inventoryStockItemId)
            })
            let obj = {
              'inventoryStockItemId': inventoryStockItemId,
              'customerId': this.customerId,
              'districtId': this.districtId
            }
            this.getService.Delete(obj).subscribe((data) => {
              Swal.fire({
                icon: "success",
                title: "Stock  Deleted Successfull",
                timer: 2500
              }).then(function () {
                window.location.reload();
              });
            })
          } else {
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Stock Delete ",
          text: "Please Select One Stock!",
        });
      }
    }
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
          this.Stock = this.getCheckedValue()[0];
          const dialogRef = this.dialog.open(StockOutUpdateComponent, {
            disableClose: true,
            data: { payload: this.Stock },
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
        title: "Update Stock Detail",
        text: "Please Select One Stock!",
      });
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
          title: 'Stock Status',
          text: 'Stock registration incompleted so can not ' + lblAction + '!',
        })
      }
      else if (!this.isMultiStatus(String(oppStatus))) {
        this.statusAlert(lblAction, activeStatus);
      } else {
        let opplblAction = activeStatus == 1 ? 'active' : 'Inactive';
        Swal.fire({
          icon: 'error',
          title: 'Stock Status',
          text: 'Please select the ' + opplblAction + ' status of the Stock!',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: activeStatus == 2 ? 'Delete Stock' : 'Change Stock Status',
        text: 'Please Select Altleast One Stock!',
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
      ids.push(item.inventoryStockItemId)
      this.inventoryStockItemId = item.inventoryStockItemId
    })
    let obj = {
      'inventoryinventoryStockItemId': ids,
      'activeStatus': activeStatus,
      'customerId': this.customerId,
      'districtId': this.districtId
    }
    this.getService.Status(obj).subscribe((res) => {
      if (res.statusMessage == 'Success') {
        Swal.fire({
          icon: "success",
          title: " Stock Status Changed Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: " Stock Status Change Failed",
          timer: 2500

        }).then(function () {
          window.location.reload();
        });

      }
    });
  }

}
