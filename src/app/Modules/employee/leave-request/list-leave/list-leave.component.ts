import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { constant } from 'src/app/core/helpers/global.helper';
import { PaginationDTO } from 'src/app/modules/model/paginationDTO';
import Swal from 'sweetalert2';
import { Leave } from '../../Model/leave.model';
import { EmployeeService } from '../../service/employee.service';
import { AppLoaderService } from 'src/app/core/service/app-loader.service';
import { ConfigService } from 'src/app/core/service/congif.service';
@Component({
  selector: 'app-list-leave',
  templateUrl: './list-leave.component.html',
  styleUrls: ['./list-leave.component.scss']
})
export class ListLeaveComponent implements OnInit {
  displayedColumns: string[] = ['select','employeeId', 'employeeName', 'departmentName','fromDate','toDate','status'];
  dataSource = new MatTableDataSource<Leave>();
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<Leave>(true, []);
  speciality: any;
  specialityId: any;
  employeeId: string;
  paginationDTO: PaginationDTO = new PaginationDTO();
  pageSizeOptions: any = 0;
  value = "";
  customerId: string;
  districtId: string;
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  isMultiStatus(status: string) {
    const others = this.getCheckedValue().filter(rol => {
      if (rol.status != status) {
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
  getCheckedValue(): Leave[] {
    let transList: Leave[] = [];
    this.dataSource.connect().value.forEach((trans) => {
      if (this.selection.isSelected(trans)) transList.push(trans);
    });
    return transList;
  }
  checkboxLabel(row?: Leave): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.employeeId + 1}`;
  }
  constructor(private config:ConfigService,public dialog: MatDialog,private getService:EmployeeService,private loader:AppLoaderService) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
    this.pageSizeOptions = constant().app.table.filtering.pageSizeOptions;
   }

  ngOnInit(): void {
    this.getData();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.paginationDTO.searchWith = filterValue;
    this.getData();
  }
  Filter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }
  onPaginateChange(event) {
    this.paginationDTO.offset = event.pageIndex;
    this.paginationDTO.limit = event.pageSize;
    this.getData();
  }
  
  getData(){
    var obj = {
      'customerId': this.customerId,
      'districtId': this.districtId
    }
    this.getService.getLeave(obj).subscribe((data) => {
      this.dataSource = new MatTableDataSource<Leave>(data.responseModel);
      this.dataSource.sort = this.sort;
      console.log(data)
    })
  }




setStaus(status: number) {
let lblAction = '';
if (status == 1) {
  lblAction = 'active';
}
else if (status == 0) {
  lblAction = 'Inactive';
}
if (this.getCheckedValue().length >= 1) {
  let oppStatus = status == 1 ? 0 : 1;
  if (status == 2) {
    this.statusAlert(lblAction, status);
  } else if (this.getCheckedValue()[0].status== '3') {
    Swal.fire({
      icon: 'error',
      title: 'Employee Status',
      text: 'Employee registration incompleted so can not ' + lblAction + '!',
    })
  }
  else if (!this.isMultiStatus(String(oppStatus))) {
    this.statusAlert(lblAction, status);
  } else {
    let opplblAction = status == 1 ? 'active' : 'Inactive';
    Swal.fire({
      icon: 'error',
      title: 'Employee Status',
      text: 'Please select the ' + opplblAction + ' status of the Employee!',
    });
  }
} else {
  Swal.fire({
    icon: 'error',
    title: status == 2 ? 'Delete Employee' : 'Change Employee Status',
    text: 'Please Select Altleast One Employee!',
  });
}
}
statusAlert(lblAction: string, status) {
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
    this.saveStatus(status);
  }
});
}
saveStatus(status) {
let ids = [];

this.getCheckedValue().forEach(item => { ids.push(item.employeeId)
  this.employeeId=item.employeeId 
})
let obj = {
  'customerId':this.customerId,
  'districtId':this.districtId,
  'employeeId':ids,
  'status':status
}
this.getService.statusLeave(obj).subscribe((res) => {
  if (res.statusMessage == 'Success') {
    Swal.fire({
      icon: "success",
      title: " Employee Leave Status Changed Successfull",
      timer: 2500
    }).then(function(){
      window.location.reload();
  });
  }
  else {
    Swal.fire({
      icon: "error",
      title: " Employee Leave Status Change Failed",
      timer: 2500
  
    }).then(function(){
      window.location.reload();
  });
    
  }
});
}
}
