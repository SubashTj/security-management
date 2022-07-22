import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Employees } from '../Model/employees.model';
import Swal from 'sweetalert2';
import { EmployeeService } from '../service/employee.service';
import { PaginationDTO } from '../../model/paginationDTO';
import { MatSort } from '@angular/material/sort';
import { constant } from 'src/app/core/helpers/global.helper';
import { AppLoaderService } from 'src/app/core/service/app-loader.service';
import { ConfigService } from 'src/app/core/service/congif.service';
import { MatPaginator } from '@angular/material/paginator';
import { AssignClientComponent } from '../assign-client/assign-client.component';
import { MatDialog } from '@angular/material/dialog';
import { District } from '../../branch-management/Model/branch.model';
import { Positions } from '../../job-position/Model/positions.model';
import { AdvanceSalaryComponent } from '../advance-salary/advance-salary.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  paginationDTO: PaginationDTO = new PaginationDTO();
  displayedColumns: string[] = ['select', 'name', 'departmentName', 'designation', 'mobileNumber', 'adhar', 'employeeActiveStatus'];
  dataSource = new MatTableDataSource<Employees>();
  selection = new SelectionModel<Employees>(true, []);
  employeeId: any;
  employee: any;
  isShowing: boolean = false;
  pageSizeOptions: any = 0;
  value = "";
  customerId: string;
  districtId: string;
  currentPageDataSize: number = 0;
  offset: number;
  limit: number;
  isLoading: boolean = false
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filterInput") filter: ElementRef;

  portalType: string;
  branches: District[];

  selectedOption = 'ALL';
  branch: Positions[];
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  constructor(public dialog: MatDialog, private config: ConfigService, private router: Router, private getService: EmployeeService, private activateRoute: ActivatedRoute, private loader: AppLoaderService
  ) {

    this.config.init();
    this.portalType = config.portalType
    this.districtId = config.districtId;
    this.customerId = config.customerId;
    if (config.portalType == 'admin') {
      this.isShowing = true
    } else {
      this.districtId = config.districtId;
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
    this.getBranch();
  }
  btnClick() {
    this.router.navigate(['employee/create'])
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
    this.selection = new SelectionModel<Employees>(true, []);

    // Refreshing table using paginator

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
    this.offset = event.pageIndex;
    this.limit = event.pageSize;
    this.getData();
  }
  onItemSelect(event: any) {
    var obj = {
      'limit': this.limit,
      'offset': this.offset,
      'customerId': this.customerId,
      'districtId': event.value
    }
    this.getService.getList(obj).subscribe((data) => {
      this.paginationDTO.totalSize = data.pageSize;
      this.currentPageDataSize = data.responseModel.length;
      this.dataSource = new MatTableDataSource<Employees>(data.responseModel);
      this.dataSource.sort = this.sort;
      console.log(data)

    })
  }
  getBranch() {
    var obj = {
      'customerId': this.customerId,
    }
    this.getService.getbranch(obj).subscribe((data) => {
      this.branches = data.responseModel;
      console.log(data)
    })
  }
  getData() {
    var obj = {
      'limit': this.limit,
      'offset': this.offset,
      'customerId': this.customerId,
      'districtId': this.districtId
    }
    this.getService.getList(obj).subscribe((data) => {
      this.paginationDTO.totalSize = data.pageSize;
      this.currentPageDataSize = data.responseModel.length;
      this.dataSource = new MatTableDataSource<Employees>(data.responseModel);
      this.dataSource.sort = this.sort;
      console.log(data)

    })
  }
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  getCheckedValue(): Employees[] {
    let transList: Employees[] = [];
    this.dataSource.connect().value.forEach((trans) => {
      if (this.selection.isSelected(trans)) transList.push(trans);
    });
    return transList;
  }

  isMultiStatus(status: string) {
    const others = this.getCheckedValue().filter(rol => {
      if (rol.employeeActiveStatus != status) {
        return rol;
      }
    });
    return others.length > 0;
  }
  actionss(option) {
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
          this.employee = this.getCheckedValue()[0];
          const dialogRef = this.dialog.open(AdvanceSalaryComponent, {
            disableClose: true,
            data: { payload: this.employee },
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
        title: "Advance Salary Create",
        text: "Please Select One One Employee!",
      });
    }
  }
  actions(option) {
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
          this.employee = this.getCheckedValue()[0];
          const dialogRef = this.dialog.open(AssignClientComponent, {
            disableClose: true,
            data: { payload: this.employee },
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
        title: "Assign Employee Detail",
        text: "Please Select One Client!",
      });
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
          var id = this.getCheckedValue()[0].employeeId;
          var url = option == 'edit' ? `employee/update-employee/${id}` : `employee/view/${id}`;
          this.router.navigate([url]);
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: option == 'edit' ? 'Edit Employee' : 'View Employee',
        text: 'Please Select One Employee!',
      })
    }
  }
  setStaus(employeeActiveStatus: number) {
    let lblAction = '';
    if (employeeActiveStatus == 1) {
      lblAction = 'active';
    }
    else if (employeeActiveStatus == 0) {
      lblAction = 'Inactive';
    }
    if (this.getCheckedValue().length >= 1) {
      let oppStatus = employeeActiveStatus == 1 ? 0 : 1;
      if (employeeActiveStatus == 2) {
        this.statusAlert(lblAction, employeeActiveStatus);
      } else if (this.getCheckedValue()[0].employeeActiveStatus == '3') {
        Swal.fire({
          icon: 'error',
          title: 'Employee Status',
          text: 'Employee registration incompleted so can not ' + lblAction + '!',
        })
      }
      else if (!this.isMultiStatus(String(oppStatus))) {
        this.statusAlert(lblAction, employeeActiveStatus);
      } else {
        let opplblAction = employeeActiveStatus == 1 ? 'active' : 'Inactive';
        Swal.fire({
          icon: 'error',
          title: 'Employee Status',
          text: 'Please select the ' + opplblAction + ' status of the Employee!',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: employeeActiveStatus == 2 ? 'Delete Employee' : 'Change Employee Status',
        text: 'Please Select Altleast One Employee!',
      });
    }
  }
  statusAlert(lblAction: string, employeeActiveStatus) {
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
        this.saveStatus(employeeActiveStatus);
      }
    });
  }
  saveStatus(employeeActiveStatus) {
    let ids = [];

    this.getCheckedValue().forEach(item => {
      ids.push(item.employeeId)
      this.employeeId = item.employeeId
    })
    let obj = {
      'districtId': this.districtId,
      'customerId': this.customerId,
      'employeeActiveStatus': employeeActiveStatus,
      'employeeId': ids
    }
    this.getService.status(obj).subscribe((res) => {
      if (res.statusCode == 200) {
        Swal.fire({
          icon: "success",
          title: " Employee Status Changed Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: " Employee Status Change Failed",
          timer: 2500

        }).then(function () {
          window.location.reload();
        });

      }

    });
  }
  Delete(option: any) {
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
              ids.push(item.employeeId)
            })
            let obj = {
              'districtId': this.districtId,
              'customerId': this.customerId,
              'employeeId': ids
            }
            this.getService.delete(obj).subscribe((data) => {

              Swal.fire({
                icon: "success",
                title: "Deleted Employee Successfull",
                timer: 2500
              }).then(function () {
                window.location.reload();
              });

            });
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Delete Employee",
          text: "Please Select One Employee",
        });
      }
    }
  }
}
