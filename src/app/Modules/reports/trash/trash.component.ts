import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { constant } from 'src/app/core/helpers/global.helper';
import { AppLoaderService } from 'src/app/core/service/app-loader.service';
import { ConfigService } from 'src/app/core/service/congif.service';
import Swal from 'sweetalert2';
import { District } from '../../branch-management/Model/branch.model';
import { Employees } from '../../employee/Model/employees.model';
import { Positions } from '../../job-position/Model/positions.model';
import { PaginationDTO } from '../../model/paginationDTO';
import { ReportService } from '../service/report.service';
@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  paginationDTO: PaginationDTO = new PaginationDTO();
  displayedColumns: string[] = ['employeeId', 'employeeName', 'departmentName', 'designation', 'mobileNumber', 'city'];
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
  constructor(public dialog: MatDialog, private config: ConfigService, private router: Router, private getService: ReportService, private activateRoute: ActivatedRoute, private loader: AppLoaderService
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
    }
    this.getService.getTrash(obj).subscribe((data) => {
      this.paginationDTO.totalSize = data.pageSize;
      this.currentPageDataSize = data.responseModel.length;
      this.dataSource = new MatTableDataSource<Employees>(data.responseModel);
      this.dataSource.sort = this.sort;
      console.log(data)

    })
  }

}

