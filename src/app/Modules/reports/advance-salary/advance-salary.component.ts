import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { constant } from 'src/app/core/helpers/global.helper';
import { ConfigService } from 'src/app/core/service/congif.service';
import { District } from '../../branch-management/Model/branch.model';
import { Employees } from '../../employee/Model/employees.model';
import { PaginationDTO } from '../../model/paginationDTO';
import { ReportService } from '../service/report.service';
@Component({
  selector: 'app-advance-salary',
  templateUrl: './advance-salary.component.html',
  styleUrls: ['./advance-salary.component.scss']
})
export class AdvanceSalaryComponent implements OnInit {
  basicForm: FormGroup;

  title = 'employeereport';
  isVisible: string = '';
  isSelected: boolean = true;
  Report: any
  date: any
  empreport: any;
  empreport1: any;
  empreport2: any;
  radioGroup: any;
  selectedValue: string = '';
  show: boolean = false;
  buttonName: any = 'Show';
  uploading: boolean = false;
  resourcesLoaded: boolean = false;
  displayedColumns: string[] = ['employeeId', 'employeeName', 'branchName', 'advancedSalaryAmount', 'advanceDate'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filterInput") filter: ElementRef;

  dataSource = new MatTableDataSource<Employees>();
  selection = new SelectionModel<Employees>(true, []);
  customerId: any;
  districtId: any;
  clients: any;
  currentPageDataSize: number = 0;
  offset: number;
  limit: number;
  pageSizeOptions: number[];
  paginationDTO: any;
  value = "";
  branchs:District[];

  constructor(private userData: ReportService, private config: ConfigService) {
    this.customerId = config.customerId;
    this.pageSizeOptions = constant().app.table.filtering.pageSizeOptions;
    this.paginationDTO = new PaginationDTO();
    this.offset = this.paginationDTO.offset
    this.limit = this.paginationDTO.limit
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
    this.Daily()

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
    this.Daily();
  }
  Filter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  onPaginateChange(event) {
    this.offset = event.pageIndex;
    this.limit = event.pageSize;
    this.Daily();
  }
  form() {
    this.basicForm = new FormGroup({
      districtId: new FormControl(''),
      branchId: new FormControl('')
    })
  }
  get control() {
    return this.basicForm.controls
  }
  reset() {
    this.basicForm.patchValue({

      branchId: ''

    })
  }
  setType(event: any) {
    this.isVisible = event.value;
    this.selectedValue = this.isVisible;
    console.log(event.value);
    console.log(this.selectedValue === 'Daily');
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.form();
 
    this.getBranch();
  }
  onItemSelect(event:any) {
    var obj = {
      'customerId': this.customerId,
      'districtId': event.value
    }
    this.userData.getClient(obj).subscribe((data) => {
      this.clients = data.responseModel;
      console.log(data)
    })
  }
  getBranch() {
    var obj = {
      'customerId': this.customerId,
    }
    this.userData.getbranch(obj).subscribe((data) => {
      this.branchs = data.responseModel;
      console.log(data)
    })
  }
  Daily() {
    var form = this.basicForm.value;

    let obj = {
      'limit': this.limit,
      'offset': this.offset,
      "branchId": form?.branchId,
      "customerId": this.customerId,
      "districtId": form?.districtId
    }
    this.userData.advanceSalary(obj).subscribe((data) => {
      this.resourcesLoaded = false;
      this.paginationDTO.totalSize = data.pageSize;
      this.currentPageDataSize = data.responseModel.length;
      this.dataSource.data = data.responseModel;
      this.dataSource.sort = this.sort;
      console.log(this.Report);
    })
    this.show = true;
  }
}
