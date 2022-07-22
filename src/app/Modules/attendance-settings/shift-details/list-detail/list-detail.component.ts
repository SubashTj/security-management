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
import { PaginationDTO } from 'src/app/modules/model/paginationDTO';
import Swal from 'sweetalert2';
import { ShiftDetails } from '../../Model/shift-details.model';
import { AttendanceSettingsService } from '../../service/attendance-settings.service';
import { CreateDetailComponent } from '../create-detail/create-detail.component';
import { UpdateDetailComponent } from '../update-detail/update-detail.component';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {
  pageSizeOptions: any = 0;
  displayedColumns: string[] = ['select', 'shiftName','shiftStartTime','shiftEndTime','activeStatus'];
  dataSource = new MatTableDataSource<ShiftDetails>();
  paginationDTO: PaginationDTO = new PaginationDTO();
  selection = new SelectionModel<ShiftDetails>(true, []);
  shiftId: number;
  shift: any;
  value = "";
  customerId: string;
  districtId: string;
  recordAddedSub: Subscription;
  recordUpdatedSub: Subscription;
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

  
  getCheckedValue(): ShiftDetails[] {
    let transList: ShiftDetails[] = [];
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

  checkboxLabel(row?: ShiftDetails): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.shiftId + 1}`;
  }
  constructor(public dialog: MatDialog,private getService:AttendanceSettingsService,private config:ConfigService,private loader:AppLoaderService) { 
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
    this.pageSizeOptions = constant().app.table.filtering.pageSizeOptions;
    this.paginationDTO = new PaginationDTO();
    this.offset= this.paginationDTO.offset
    this.limit= this.paginationDTO.limit
   }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this. getData();
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
    this.getData()
    this.paginator.pageIndex = this.paginationDTO.offset;
    this.paginator.pageSize = this.paginationDTO.limit;
    this.paginator.length = this.paginationDTO.totalSize;
    //clear selection
    this.selection = new SelectionModel<ShiftDetails>(true, []);

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
  addSub() {
    this.recordAddedSub = this.getService
      .getRecordAddedSub()
      .subscribe((data) => {
        let shift = data[0];
        let pid = shift?.shiftId ?? 0;
        if (pid > 0) {
          this.refreshTable('add');
        }
      });
  }

  updateSub() {
    this.recordUpdatedSub = this.getService
      .getRecordUpdatedSub()
      .subscribe((data) => {
        let shift = data[0];
        let pid = shift?.shiftId ?? 0;


        if (pid > 0) {
          this.refreshTable('edit');
        }
      });
  }
  getData(){
    var obj = {
      'limit':this.limit,
      'offset':this.offset,
      'customerId': this.customerId,
      'districtId': this.districtId
    }
    this.getService.getDetail(obj).subscribe((data) => {
      this.paginationDTO.totalSize = data.pageSize;
      this.currentPageDataSize = data.responseModel.length;
      this.dataSource = new MatTableDataSource<ShiftDetails>(data.responseModel);
      this.dataSource.sort = this.sort;
      console.log(data)
    })
  }
  create() {
    const dialogRef = this.dialog.open(CreateDetailComponent, {
      disableClose: true,
    });
  }
  Delete(option){
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
  let shiftId = [];
this.getCheckedValue().forEach(item => { shiftId.push(item.shiftId)
})
let obj={
  'shiftId':shiftId,
  'customerId': this.customerId,
  'districtId': this.districtId
}
  this.getService.Delete(obj).subscribe((data) => {
    Swal.fire({
      icon: "success",
      title: "Shift  Deleted Successfull",
      timer: 2500
    }).then(function(){
      window.location.reload();
  });
  })
          } else {
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Shift Delete ",
          text: "Please Select One Shift!",
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
          const dialogRef = this.dialog.open(UpdateDetailComponent, {
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
        title: "Update Shift Detail",
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
  if (this.getCheckedValue().length >= 1) {
    let oppStatus = activeStatus == 1 ? 0 : 1;
    if (activeStatus == 2) {
      this.statusAlert(lblAction, activeStatus);
    } else if (this.getCheckedValue()[0].activeStatus== '3') {
      Swal.fire({
        icon: 'error',
        title: 'Shift Status',
        text: 'Shift registration incompleted so can not ' + lblAction + '!',
      })
    }
    else if (!this.isMultiStatus(String(oppStatus))) {
      this.statusAlert(lblAction, activeStatus);
    } else {
      let opplblAction = activeStatus == 1 ? 'active' : 'Inactive';
      Swal.fire({
        icon: 'error',
        title: 'Shift Status',
        text: 'Please select the ' + opplblAction + ' status of the Shift!',
      });
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: activeStatus == 2 ? 'Delete Shift' : 'Change Shift Status',
      text: 'Please Select Altleast One Shift!',
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
 
  this.getCheckedValue().forEach(item => { ids.push(item.shiftId)
    this.shiftId=item.shiftId 
})
  let obj = {
    'shiftId':ids,
    'activeStatus':activeStatus,
    'customerId': this.customerId,
    'districtId': this.districtId
  }
  this.getService.Status(obj).subscribe((res) => {
    if (res.statusMessage == 'Success') {
      Swal.fire({
        icon: "success",
        title: " Shift Status Changed Successfull",
        timer: 2500
      }).then(function(){
        window.location.reload();
    });
    }
    else {
      Swal.fire({
        icon: "error",
        title: " Shift Status Change Failed",
        timer: 2500
    
      }).then(function(){
        window.location.reload();
    });
      
    }
  });
}
}
