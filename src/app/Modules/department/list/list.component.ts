import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Department } from '../Department-Model/department.model';
import {MatDialog} from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';
import { DepartmentService } from '../service/department.service';
import { UpdateDepartmentComponent } from '../update-department/update-department.component';
import Swal from 'sweetalert2';
import { PaginationDTO } from '../../model/paginationDTO';
import { constant } from 'src/app/core/helpers/global.helper';
import { AppLoaderService } from 'src/app/core/service/app-loader.service';
import { ConfigService } from 'src/app/core/service/congif.service';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['select', 'departmentName','activeStatus'];
  dataSource = new MatTableDataSource<Department>();
  paginationDTO: PaginationDTO = new PaginationDTO();
  selection = new SelectionModel<Department>(true, []);
  pageSizeOptions: any = 0;
  responseModel:any;
  department: any;
  departmentId: any;
  value = "";
  customerId: string;
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
  getCheckedValue(): Department[] {
    let transList: Department[] = [];
    this.dataSource.connect().value.forEach((trans) => {
      if (this.selection.isSelected(trans)) transList.push(trans);
    });
    return transList;
  }
  checkboxLabel(row?: Department): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.departmentId + 1}`;
  }
  constructor(public config: ConfigService,public dialog: MatDialog,private getService:DepartmentService,private loader:AppLoaderService) { 
    this.config.init();
    this.customerId = config.customerId;
    this.pageSizeOptions = constant().app.table.filtering.pageSizeOptions;
    this.paginationDTO = new PaginationDTO();
    this.offset= this.paginationDTO.offset
    this.limit= this.paginationDTO.limit
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
    this.selection = new SelectionModel<Department>(true, []);

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
  getData(){
    var obj = {
      'limit':this.limit,
      'offset':this.offset,
      'customerId': this.customerId,
    }
    this.getService.getDepartment(obj).subscribe((data) => {
      this.paginationDTO.totalSize = data.pageSize;
      this.currentPageDataSize = data.responseModel.length;
      this.dataSource = new MatTableDataSource<Department>(data.responseModel);
      this.dataSource.sort = this.sort;
    })
  }
  addSub() {
    this.recordAddedSub = this.getService
      .getRecordAddedSub()
      .subscribe((responseModel) => {
        let dept = responseModel[0];
        let pid = dept?.departmentId ?? 0;
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
        let pid = dept?.departmentId ?? 0;


        if (pid > 0) {
          this.refreshTable('edit');
        }
      });
  }

  create() {
    const dialogRef = this.dialog.open(CreateComponent, {
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
          this.department = this.getCheckedValue()[0];
          const dialogRef = this.dialog.open(UpdateDepartmentComponent, {
            disableClose: true,
            data: { payload: this.department },
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
        title: "Update department",
        text: "Please Select One department!",
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
          
let departmentId = [];
this.getCheckedValue().forEach(item => { departmentId.push(item.departmentId)
})
let obj={
  'customerId': this.customerId,
  'departmentId':departmentId,
}
this.getService.Delete(obj).subscribe((data) => {
  Swal.fire({
    icon: "success",
    title: "Deleted Department Successfull",
    timer: 2500
  }).then(function(){
    window.location.reload();
});
 
})
}
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Delete Department",
        text: "Please Select One Department !",
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
    } else if (this.getCheckedValue()[0].activeStatus== '3') {
      Swal.fire({
        icon: 'error',
        title: 'Department Status',
        text: 'Department registration incompleted so can not ' + lblAction + '!',
      })
    }
    else if (!this.isMultiStatus(String(oppStatus))) {
      this.statusAlert(lblAction, activeStatus);
    } else {
      let opplblAction = activeStatus == 1 ? 'active' : 'Inactive';
      Swal.fire({
        icon: 'error',
        title: 'Department Status',
        text: 'Please select the ' + opplblAction + ' status of the Department!',
      });
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: activeStatus == 2 ? 'Delete Department' : 'Change Department Status',
      text: 'Please Select Altleast One Department!',
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
  this.getCheckedValue().forEach(item => { ids.push(item.departmentId)
    this.departmentId=item.departmentId 
})
  let obj = {
    'customerId': this.customerId,
    'departmentId':ids,
    'activeStatus':activeStatus
  }
  this.getService.status(obj).subscribe((res) => {
    if (res.statusMessage == 'Success') {
      Swal.fire({
        icon: "success",
        title: " Department Status Changed Successfull",
        timer: 2500
      }).then(function(){
        window.location.reload();
    });
    }
    else {
      Swal.fire({
        icon: "error",
        title: " Department Status Change Failed",
        timer: 2500
    
      }).then(function(){
        window.location.reload();
    });
      
    }

  });
}
}
