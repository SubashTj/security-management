import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { constant } from 'src/app/core/helpers/global.helper';
import { ConfigService } from 'src/app/core/service/congif.service';
import Swal from 'sweetalert2';
import { PaginationDTO } from '../../model/paginationDTO';
import { EmpAttendanceList } from '../Model/attendance-time.model';
import { AttendanceSettingsService } from '../service/attendance-settings.service';
@Component({
  selector: 'app-attendance-time',
  templateUrl: './attendance-time.component.html',
  styleUrls: ['./attendance-time.component.scss']
})
export class AttendanceTimeComponent implements OnInit {
  paginationDTO: PaginationDTO = new PaginationDTO();
  pageSizeOptions: any = 0;
  displayedColumns: string[] = ['select', 'department', 'position', 'customizeDate', 'activeStatus'];
  dataSource = new MatTableDataSource<EmpAttendanceList>();
  selection = new SelectionModel<EmpAttendanceList>(true, []);
  shiftId: number;
  shift: any;
  value = "";
  empAttendanceGroupId: any;
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


  getCheckedValue(): EmpAttendanceList[] {
    let transList: EmpAttendanceList[] = [];
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

  checkboxLabel(row?: EmpAttendanceList): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.empAttendanceGroupId + 1}`;
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
    this.selection = new SelectionModel<EmpAttendanceList>(true, []);

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
    this.getService.getTimeList(obj).subscribe((data) => {
      this.paginationDTO.totalSize = data.pageSize;
      this.currentPageDataSize = data.responseModel.length;
      this.dataSource = new MatTableDataSource<EmpAttendanceList>(data.responseModel);
      this.dataSource.sort = this.sort;
      console.log(data)
    })
  }

  create() {

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
            let empAttendanceGroupId = [];

            this.getCheckedValue().forEach(item => {
              empAttendanceGroupId.push(item.empAttendanceGroupId)
              this.empAttendanceGroupId = item.empAttendanceGroupId
            })
            let obj = {
              'empAttendanceGroupId': empAttendanceGroupId,
              'customerId': this.customerId,
              'districtId': this.districtId
            }
            this.getService.delete(obj).subscribe((data) => {
              Swal.fire({
                icon: "success",
                title: "Attendance-Time Deleted Successfull",
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
          text: "Please Select One Attendance-Time!",
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
          // const dialogRef = this.dialog.open( {
          //   width: "40%",
          //   disableClose: true,
          //   data: { payload: this.shift },
          // });
          // dialogRef.afterClosed().subscribe((result) => {
          //   if (result) {
          //     this.dataSource.sort = this.sort;
          //   }
          // });
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
  setStaus(activeStatus: number) {
    let lblAction = '';
    if (activeStatus == 1) {
      lblAction = 'active';
    }
    else if (activeStatus == 0) {
      lblAction = 'Inactive';
    }
    // else if (employeeActiveStatus == 2) {
    //   lblAction = 'delete';
    // }
    if (this.getCheckedValue().length >= 1) {
      let oppStatus = activeStatus == 1 ? 0 : 1;
      if (activeStatus == 2) {
        this.statusAlert(lblAction, activeStatus);
      } else if (this.getCheckedValue()[0].activeStatus == '3') {
        Swal.fire({
          icon: 'error',
          title: 'Attendance Status',
          text: 'Attendance registration incompleted so can not ' + lblAction + '!',
        })
      }
      else if (!this.isMultiStatus(String(oppStatus))) {
        this.statusAlert(lblAction, activeStatus);
      } else {
        let opplblAction = activeStatus == 1 ? 'active' : 'Inactive';
        Swal.fire({
          icon: 'error',
          title: 'Attendance Status',
          text: 'Please select the ' + opplblAction + ' status of the Attendance!',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: activeStatus == 2 ? 'Delete Attendance' : 'Change Attendance Status',
        text: 'Please Select Altleast One Attendance!',
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
      ids.push(item.empAttendanceGroupId)
      this.empAttendanceGroupId = item.empAttendanceGroupId
    })
    let obj = {
      'empAttendanceGroupId': this.empAttendanceGroupId,
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
