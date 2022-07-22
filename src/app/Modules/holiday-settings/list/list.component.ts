import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CreateComponent } from '../create/create.component';
import { Holiday } from '../Model/holiday-setting.model';
import { HolidayService } from '../service/holiday.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UpdateComponent } from '../update/update.component';
import { PaginationDTO } from '../../model/paginationDTO';
import { MatSort } from '@angular/material/sort';
import { constant } from 'src/app/core/helpers/global.helper';
import { MatPaginator } from '@angular/material/paginator';
import { ConfigService } from 'src/app/core/service/congif.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  paginationDTO: PaginationDTO = new PaginationDTO();
  pageSizeOptions: any = 0;
  displayedColumns: string[] = ['select', 'fromDate', 'toDate', 'title', 'description', 'option'];
  dataSource = new MatTableDataSource<Holiday>();
  selection = new SelectionModel<Holiday>(true, []);
  holiday: any = {};
  holidayId: any;
  value = "";
  currentPageDataSize: number = 0;
  recordAddedSub: Subscription;
  recordUpdatedSub: Subscription;
  offset: number;
  limit: number;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filterInput") filter: ElementRef;
  customerId: any;
  districtId: any;
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  getCheckedValue(): Holiday[] {
    let transList: Holiday[] = [];
    this.dataSource.connect().value.forEach((trans) => {
      if (this.selection.isSelected(trans)) transList.push(trans);
    });
    return transList;
  }

  checkboxLabel(row?: Holiday): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.description + 1}`;
  }
  constructor(public config: ConfigService, public dialog: MatDialog, private getService: HolidayService, private router: Router) {
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
    this.getholiday();
  }
  ngAfterViewInit() {
    this.addSub();
    this.updateSub();
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
    this.getholiday()

    this.paginator.pageIndex = this.paginationDTO.offset;
    this.paginator.pageSize = this.paginationDTO.limit;
    this.paginator.length = this.paginationDTO.totalSize;
    //clear selection
    this.selection = new SelectionModel<Holiday>(true, []);
    // Refreshing table using paginator
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.paginationDTO.searchWith = filterValue;
    this.getholiday();
  }
  onPaginateChange(event) {
    this.offset = event.pageIndex;
    this.limit = event.pageSize;
    this.getholiday();
  }
  Filter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  addSub() {
    this.recordAddedSub = this.getService
      .getRecordAddedSub()
      .subscribe((data) => {
        let holi = data[0];
        let pid = holi?.holidayId ?? 0;
        if (pid > 0) {
          this.refreshTable('add');
        }
      });
  }

  updateSub() {
    this.recordUpdatedSub = this.getService
      .getRecordUpdatedSub()
      .subscribe((data) => {
        let holi = data[0];
        let pid = holi?.holidayId ?? 0;


        if (pid > 0) {
          this.refreshTable('edit');
        }
      });
  }
  getholiday() {
    var obj = {
      'limit': this.limit,
      'offset': this.offset,
      'customerId': this.customerId,
      'districtId': this.districtId
    }
    this.getService.getHoliday(obj).subscribe((data) => {
      this.paginationDTO.totalSize = data.pageSize;
      this.currentPageDataSize = data.responseModel.length;
      this.dataSource = new MatTableDataSource<Holiday>(data.responseModel);
      this.dataSource.sort = this.sort;
      console.log(data)
    })
  }
  create() {
    const dialogRef = this.dialog.open(CreateComponent, {
      disableClose: true,
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
          this.holiday = this.getCheckedValue()[0];
          const dialogRef = this.dialog.open(UpdateComponent, {
            disableClose: true,
            data: { payload: this.holiday },
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
        title: "Update Holiday",
        text: "Please Select One Holiday!",
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
            let ids = [];

            this.getCheckedValue().forEach(item => {
              ids.push(item.holidayId)

            })
            let obj = {
              'districtId': this.districtId,
              'customerId': this.customerId,
              'holidayId': ids,
            }
            this.getService.Delete(obj).subscribe((data) => {
              Swal.fire({
                icon: "success",
                title: "Deleted Holiday Successfull",
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
          title: "Delete Holiday",
          text: "Please Select One Holiday!",
        });
      }
    }
  }
}