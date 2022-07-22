import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { constant } from 'src/app/core/helpers/global.helper';
import { AppLoaderService } from 'src/app/core/service/app-loader.service';
import { ConfigService } from 'src/app/core/service/congif.service';
import { PaginationDTO } from '../../model/paginationDTO';
import { Purchase } from '../Model/purchase.model';
import { PuchaseService } from '../service/puchase.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss']
})
export class PurchaseListComponent implements OnInit {

  pageSizeOptions: any = 0;
  displayedColumns: string[] = [
    "select",
    "receiptNumber",
    "vendor",
    "purchaseamount",
    "invoicedate",
    "paid",
    "balance",
    "activeStatus",];
  dataSource = new MatTableDataSource<Purchase>();
  paginationDTO: PaginationDTO = new PaginationDTO();
  selection = new SelectionModel<Purchase>(true, []);
  receiptNumber: string;
  Stock: any;
  value = "";
  customerId: string;
  branchId: string;
  isLoading: boolean = false
  currentPageDataSize: number = 0;
  offset: number;
  limit: number;
  isShowing: boolean = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filterInput") filter: ElementRef;
  branch: any;
  purchaseId: any;

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }


  getCheckedValue(): Purchase[] {
    let transList: Purchase[] = [];
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

  checkboxLabel(row?: Purchase): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.receiptNumber + 1}`;
  }
  constructor(public dialog: MatDialog, private getService: PuchaseService, private config: ConfigService, private loader: AppLoaderService, private router: Router) {
    this.config.init();
    this.customerId = config.customerId;
    this.branchId = config.branchId;
    if (config.portalType == 'admin') {
      this.isShowing = true
    } else {
      this.branchId = config.branchId;
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
    this.selection = new SelectionModel<Purchase>(true, []);

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
      // 'branchId': this.branchId
    }
    this.getService.getdetail(obj).subscribe((data) => {
      this.paginationDTO.totalSize = data.pageSize;
      this.currentPageDataSize = data.responseModel.length;
      this.dataSource = new MatTableDataSource<Purchase>(data.responseModel);
      this.dataSource.sort = this.sort;
      console.log(data)
    })
  }
  // create() {
  //   const dialogRef = this.dialog.open(PurchaseCreateComponent, {
  //     disableClose: true,
  //   });
  // }
  btnClick() {
    this.router.navigate(['purchase/purchase-create'])
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
          var id = this.getCheckedValue()[0].purchaseId;
          var url = option == 'edit' ? `purchase/purchase-update/${id}` : `purchase/edit/${id}`;
          this.router.navigate([url]);
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: option == 'edit' ? 'Edit Purchase' : 'View Purchase',
        text: 'Please Select One Purchase!',
      })
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
          title: 'Purchase Status',
          text: 'Purchase registration incompleted so can not ' + lblAction + '!',
        })
      }
      else if (!this.isMultiStatus(String(oppStatus))) {
        this.statusAlert(lblAction, activeStatus);
      } else {
        let opplblAction = activeStatus == 1 ? 'active' : 'Inactive';
        Swal.fire({
          icon: 'error',
          title: 'Purchase Status',
          text: 'Please select the ' + opplblAction + ' status of the Purchase!',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: activeStatus == 2 ? 'Delete Purchase' : 'Change Purchase Status',
        text: 'Please Select Altleast One Purchase!',
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
      ids.push(item.purchaseId)
      this.purchaseId = item.purchaseId
    })
    let obj = {
      'purchaseId': ids,
      'activeStatus': activeStatus,
      'customerId': this.customerId,



    }
    this.getService.purchasestatus(obj).subscribe((res) => {
      if (res.statusCode == 200) {
        Swal.fire({
          icon: "success",
          title: " Purchase Status Changed Successfull",
          timer: 2500
        }).then(function () {
          // window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: " Purchase Status Change Failed",
          timer: 2500

        }).then(function () {
          // window.location.reload();
        });

      }
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
            let purchaseId = [];
            this.getCheckedValue().forEach(item => {
              purchaseId.push(item.purchaseId)
            })
            let obj = {
              'deletedId': purchaseId,
              'customerId': this.customerId,
            }
            this.getService.delete(obj).subscribe((data) => {
              Swal.fire({
                icon: "success",
                title: "Purchase  Deleted Successfull",
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
          title: "Purchase Delete ",
          text: "Please Select One Purchase!",
        });
      }
    }
  }

}
