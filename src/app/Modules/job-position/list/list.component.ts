import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CreateComponent } from '../create/create.component';
import { Positions } from '../Model/positions.model';
import {MatDialog} from '@angular/material/dialog';
import { PositionService } from '../service/position.service';
import Swal from 'sweetalert2';
import { UpdatePositionComponent } from '../update-position/update-position.component';
import { MatSort } from '@angular/material/sort';
import { PaginationDTO } from '../../model/paginationDTO';
import { constant } from 'src/app/core/helpers/global.helper';
import { ConfigService } from 'src/app/core/service/congif.service';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['select', 'departmentName', 'designation','activeStatus'];
  dataSource = new MatTableDataSource<Positions>();
  selection = new SelectionModel<Positions>(true, []);
  paginationDTO: PaginationDTO = new PaginationDTO();
  position: any;
  designationId: string;
  pageSizeOptions: any = 0;
  value = "";
  customerId: string;
  offset: number;
  limit: number;
  districtId: string;
  currentPageDataSize: number = 0;
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
  getCheckedValue(): Positions[] {
    let transList: Positions[] = [];
    this.dataSource.connect().value.forEach((trans) => {
      if (this.selection.isSelected(trans)) transList.push(trans);
    });
    return transList;
  }
  checkboxLabel(row?: Positions): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.designationId + 1}`;
  }
  constructor(private config:ConfigService,public dialog: MatDialog,private getService:PositionService) { 
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
    this.selection = new SelectionModel<Positions>(true, []);

    // Refreshing table using paginator

  }

  ngAfterViewInit() {
    this.addSub();
    this.updateSub();
    this.dataSource.sort = this.sort;
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
        let desi = data[0];
        let pid = desi?.designationId ?? 0;
        if (pid > 0) {
          this.refreshTable('add');
        }
      });
  }

  updateSub() {
    this.recordUpdatedSub = this.getService
      .getRecordUpdatedSub()
      .subscribe((data) => {
        let desi = data[0];
        let pid = desi?.designationId ?? 0;


        if (pid > 0) {
          this.refreshTable('edit');
        }
      });
  }
  getData(){
    var obj = {
      'limit':this.limit,
      'offset':this.offset,
      'customerId': this.customerId
    }
    this.getService.getPosition(obj).subscribe((data) => {
      this.paginationDTO.totalSize = data.pageSize;
      this.currentPageDataSize = data.responseModel.length;
      this.dataSource = new MatTableDataSource<Positions>(data.responseModel);
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
          this.position = this.getCheckedValue()[0];
          const dialogRef = this.dialog.open(UpdatePositionComponent, {
            disableClose: true,
            data: { payload: this.position },
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
        title: "Update Designation ",
        text: "Please Select One Designation !",
      });
    }
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
          let designationId = [];
          this.getCheckedValue().forEach(item => { designationId.push(item.designationId)
          })
          let obj={
            'designationId':designationId,
            'customerId': this.customerId,
            'districtId': this.districtId
          }
this.getService.Delete(obj).subscribe((data) => {
  Swal.fire({
    icon: "success",
    title: "Designation  Deleted Successfull",
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
        title: "Delete Designation ",
        text: "Please Select One Designation !",
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
// else if (employeeActiveStatus == 2) {
//   lblAction = 'delete';
// }
if (this.getCheckedValue().length >= 1) {
  let oppStatus = activeStatus == 1 ? 0 : 1;
  if (activeStatus == 2) {
    this.statusAlert(lblAction, activeStatus);
  } else if (this.getCheckedValue()[0].activeStatus== '3') {
    Swal.fire({
      icon: 'error',
      title: 'Designation  Status',
      text: 'Designation  registration incompleted so can not ' + lblAction + '!',
    })
  }
  else if (!this.isMultiStatus(String(oppStatus))) {
    this.statusAlert(lblAction, activeStatus);
  } else {
    let opplblAction = activeStatus == 1 ? 'active' : 'Inactive';
    Swal.fire({
      icon: 'error',
      title: 'Designation  Status',
      text: 'Please select the ' + opplblAction + ' status of the Designation !',
    });
  }
} else {
  Swal.fire({
    icon: 'error',
    title: activeStatus == 2 ? 'Delete Designation ' : 'Change Designation  Status',
    text: 'Please Select Altleast One Designation !',
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

this.getCheckedValue().forEach(item => { ids.push(item.designationId)
  this.designationId=item.designationId 
})
let obj = {
  'designationId':ids,
  'activeStatus':activeStatus,
  'customerId': this.customerId,
  'districtId': this.districtId
}
this.getService.status(obj).subscribe((res) => {
  if (res.statusMessage == 'Success') {
    Swal.fire({
      icon: "success",
      title: " Designation  Status Changed Successfull",
      timer: 2500
    }).then(function(){
      window.location.reload();
  });
  }
  else {
    Swal.fire({
      icon: "error",
      title: " Designation  Status Change Failed",
      timer: 2500
  
    }).then(function(){
      window.location.reload();
  });
    
  }
});
}
}
