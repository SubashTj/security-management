import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ShiftAssign } from '../../Model/shift-assign.model';
import { AttendanceSettingsService } from '../../service/attendance-settings.service';
import { CreateComponent } from '../create/create.component';
import { UpdateAssignComponent } from '../update-assign/update-assign.component';
import { MatSort, Sort } from '@angular/material/sort';
import { PaginationDTO } from 'src/app/Modules/model/paginationDTO';
import { constant } from 'src/app/core/helpers/global.helper';
import { ConfigService } from 'src/app/core/service/congif.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  paginationDTO: PaginationDTO = new PaginationDTO();
  pageSizeOptions: any = 0;
  displayedColumns: string[] = ['select', 'name', 'departmentName', 'designation', 'shiftName', 'activeStatus'];
  dataSource = new MatTableDataSource<ShiftAssign>();
  selection = new SelectionModel<ShiftAssign>(true, []);
  shiftId: number;
  shift: any;
  value = "";
  shiftAssignId: any;
  districtId: string;
  customerId: string;
  currentPageDataSize: number = 0;
  offset: number;
  limit: number;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filterInput") filter: ElementRef;
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }


  getCheckedValue(): ShiftAssign[] {
    let transList: ShiftAssign[] = [];
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

  checkboxLabel(row?: ShiftAssign): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.shiftAssignId + 1}`;
  }
  constructor(private config: ConfigService, public dialog: MatDialog, private getService: AttendanceSettingsService) {
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
    this.selection = new SelectionModel<ShiftAssign>(true, []);

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
    this.getService.getAssign(obj).subscribe((data) => {
      this.paginationDTO.totalSize = data.pageSize;
      this.currentPageDataSize = data.responseModel.length;
      this.dataSource = new MatTableDataSource<ShiftAssign>(data.responseModel);
      this.dataSource.sort = this.sort;
      console.log(data)
    })
  }

  create() {
    const dialogRef = this.dialog.open(CreateComponent, {
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
            let shiftAssignId = [];

            this.getCheckedValue().forEach(item => {
              shiftAssignId.push(item.shiftAssignId)
              this.shiftAssignId = item.shiftAssignId
            })
            let obj = {
              'shiftAssignId': shiftAssignId,
              'customerId': this.customerId,
              'districtId': this.districtId
            }
            this.getService.delete(obj).subscribe((data) => {
              Swal.fire({
                icon: "success",
                title: "Shift Assign Deleted Successfull",
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
          title: "Delete Shift Assign",
          text: "Please Select One Assigned Employee!",
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
          this.shift = this.getCheckedValue()[0];
          const dialogRef = this.dialog.open(UpdateAssignComponent, {
            disableClose: true,
            data: { payload: this.shift },
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
        title: "Update Shift",
        text: "Please Select One Shift!",
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
      ids.push(item.shiftAssignId)
      this.shiftAssignId = item.shiftAssignId
    })
    let obj = {
      'shiftAssignId': this.shiftAssignId,
      'activeStatus': activeStatus,
      'customerId': this.customerId,
      'districtId': this.districtId
    }
    this.getService.Status(obj).subscribe((res) => {
      console.log(obj)
      let data = res;
      if (data.keyword == 'success') {


      } else {

      }
    });
  }

}
