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
import { ExpenseSettingsService } from '../expense-settings.service';
import { ExpenseTypeCreateComponent } from '../expense-type-create/expense-type-create.component';
import { ExpenseTypeUpdateComponent } from '../expense-type-update/expense-type-update.component';
import { ExpenseType } from '../Model/expense-type.model';
@Component({
  selector: 'app-expense-type',
  templateUrl: './expense-type.component.html',
  styleUrls: ['./expense-type.component.scss']
})
export class ExpenseTypeComponent implements OnInit {
  displayedColumns: string[] = ['select', 'expenstypename', 'activeStatus'];
  dataSource = new MatTableDataSource<ExpenseType>();
  paginationDTO: PaginationDTO = new PaginationDTO();
  selection = new SelectionModel<ExpenseType>(true, []);
  pageSizeOptions: any = 0;
  responseModel: any;
  expensetype: any;
  expenseTypeId: any;
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
  getCheckedValue(): ExpenseType[] {
    let transList: ExpenseType[] = [];
    this.dataSource.connect().value.forEach((trans) => {
      if (this.selection.isSelected(trans)) transList.push(trans);
    });
    return transList;
  }
  checkboxLabel(row?: ExpenseType): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.expenseTypeId + 1}`;
  }
  constructor(public config: ConfigService, public dialog: MatDialog, private getService: ExpenseSettingsService, private loader: AppLoaderService) {
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
    this.selection = new SelectionModel<ExpenseType>(true, []);

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
    this.getService.getExpenseType(obj).subscribe((data) => {
      this.paginationDTO.totalSize = data.pageSize;
      this.currentPageDataSize = data.responseModel.length;
      this.dataSource = new MatTableDataSource<ExpenseType>(data.responseModel);
      this.dataSource.sort = this.sort;
    })
  }
  addSub() {
    this.recordAddedSub = this.getService
      .getRecordAddedSub()
      .subscribe((responseModel) => {
        let dept = responseModel[0];
        let pid = dept?.expenseTypeId ?? 0;
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
        let pid = dept?.expenseTypeId ?? 0;


        if (pid > 0) {
          this.refreshTable('edit');
        }
      });
  }

  create() {
    const dialogRef = this.dialog.open(ExpenseTypeCreateComponent, {
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
          this.expensetype = this.getCheckedValue()[0];
          const dialogRef = this.dialog.open(ExpenseTypeUpdateComponent, {
            disableClose: true,
            data: { payload: this.expensetype },
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
        title: "Update Expense-Type",
        text: "Please Select One Expense-Type!",
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

            let id = [];
            this.getCheckedValue().forEach(item => {
              id.push(item.expenseTypeId)
            })
            let obj = {
              'customerId': this.customerId,
              'districtId': this.districtId,
              'expenseTypeId': id,
            }
            this.getService.Delete(obj).subscribe((data) => {
              Swal.fire({
                icon: "success",
                title: "Deleted Expense-Type Successfull",
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
          title: "Delete Expense-Type",
          text: "Please Select One Expense-Type !",
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
          title: 'Expense-Type Status',
          text: 'Expense-Type registration incompleted so can not ' + lblAction + '!',
        })
      }
      else if (!this.isMultiStatus(String(oppStatus))) {
        this.statusAlert(lblAction, activeStatus);
      } else {
        let opplblAction = activeStatus == 1 ? 'active' : 'Inactive';
        Swal.fire({
          icon: 'error',
          title: 'Expense-Type Status',
          text: 'Please select the ' + opplblAction + ' status of the Expense-Type!',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: activeStatus == 2 ? 'Delete Expense-Type' : 'Change Expense-Type Status',
        text: 'Please Select Altleast One Expense-Type!',
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
      ids.push(item.expenseTypeId)
      this.expenseTypeId = item.expenseTypeId
    })
    let obj = {
      'customerId': this.customerId,
      'expenseTypeId': ids,
      'activeStatus': activeStatus
    }
    this.getService.status(obj).subscribe((res) => {
      if (res.statusCode == 200) {
        Swal.fire({
          icon: "success",
          title: " Expense-Type Status Changed Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: " Expense-Type Status Change Failed",
          timer: 2500

        }).then(function () {
          window.location.reload();
        });

      }

    });
  }

}
