import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PaginationDTO } from '../../model/paginationDTO';
import { constant } from 'src/app/core/helpers/global.helper';
import { AppLoaderService } from 'src/app/core/service/app-loader.service';
import { ConfigService } from 'src/app/core/service/congif.service';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { License } from '../Model/license.model';
import { LicenseRemainderRoutingModule } from '../license-remainder-routing.module';
import { LicenseRemainderService } from '../service/license-remainder.service';
import { LicenseCreateComponent } from '../license-create/license-create.component';
import { LicenseUpdateComponent } from '../license-update/license-update.component';
@Component({
  selector: 'app-license-list',
  templateUrl: './license-list.component.html',
  styleUrls: ['./license-list.component.scss']
})
export class LicenseListComponent implements OnInit {
  displayedColumns: string[] = ['select', 'licenseName','licenseNumber','startDate','endDate','activeStatus'];
  dataSource = new MatTableDataSource<License>();
  paginationDTO: PaginationDTO = new PaginationDTO();
  selection = new SelectionModel<License>(true, []);
  pageSizeOptions: any = 0;
  responseModel:any;
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
  license: License;
  licenseId: string;

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
  getCheckedValue(): License[] {
    let transList: License[] = [];
    this.dataSource.connect().value.forEach((trans) => {
      if (this.selection.isSelected(trans)) transList.push(trans);
    });
    return transList;
  }
  checkboxLabel(row?: License): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.licenseId + 1}`;
  }
  constructor(public config: ConfigService,public dialog: MatDialog,private getService:LicenseRemainderService,private loader:AppLoaderService) { 
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
    this.selection = new SelectionModel<License>(true, []);

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
      this.dataSource = new MatTableDataSource<License>(data.responseModel);
      this.dataSource.sort = this.sort;
    })
  }

  create() {
    const dialogRef = this.dialog.open(LicenseCreateComponent, {
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
          this.license = this.getCheckedValue()[0];
          const dialogRef = this.dialog.open(LicenseUpdateComponent, {
            disableClose: true,
            data: { payload: this.license },
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
        title: "Update License-Remainder",
        text: "Please Select One License-Remainder!",
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
          
let licenseId = [];
this.getCheckedValue().forEach(item => { licenseId.push(item.licenseId)
})
let obj={
  'customerId': this.customerId,
  'licenseId':licenseId,
}
this.getService.Delete(obj).subscribe((data) => {
  Swal.fire({
    icon: "success",
    title: "Deleted License-Remainder Successfull",
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
        title: "Delete License-Remainder",
        text: "Please Select One License-Remainder !",
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
        title: 'License-Remainder Status',
        text: 'License-Remainder registration incompleted so can not ' + lblAction + '!',
      })
    }
    else if (!this.isMultiStatus(String(oppStatus))) {
      this.statusAlert(lblAction, activeStatus);
    } else {
      let opplblAction = activeStatus == 1 ? 'active' : 'Inactive';
      Swal.fire({
        icon: 'error',
        title: 'License-Remainder Status',
        text: 'Please select the ' + opplblAction + ' status of the License-Remainder!',
      });
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: activeStatus == 2 ? 'Delete License-Remainder' : 'Change License-Remainder Status',
      text: 'Please Select Altleast One License-Remainder!',
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
  this.getCheckedValue().forEach(item => { ids.push(item.licenseId)
    this.licenseId=item.licenseId 
})
  let obj = {
    'customerId': this.customerId,
    'licenseId':ids,
    'activeStatus':activeStatus
  }
  this.getService.status(obj).subscribe((res) => {
    if (res.statusCode == 200 ) {
      Swal.fire({
        icon: "success",
        title: " License-Remainder Status Changed Successfull",
        timer: 2500
      }).then(function(){
        window.location.reload();
    });
    }
    else {
      Swal.fire({
        icon: "error",
        title: " License-Remainder Status Change Failed",
        timer: 2500
    
      }).then(function(){
        // window.location.reload();
    });
      
    }

  });
}
}
