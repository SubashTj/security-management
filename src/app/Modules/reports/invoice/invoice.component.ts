import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { constant, getYears } from 'src/app/core/helpers/global.helper';
import { ConfigService } from 'src/app/core/service/congif.service';
import { District } from '../../branch-management/Model/branch.model';
import { Employees } from '../../employee/Model/employees.model';
import { Positions } from '../../job-position/Model/positions.model';
import { PaginationDTO } from '../../model/paginationDTO';
import { ReportService } from '../service/report.service';
export interface Month {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  years: any[] = getYears();
  months: Month[] = [
    { value: '01', viewValue: 'January' },
    { value: '02', viewValue: 'February' },
    { value: '03', viewValue: 'March' },
    { value: '04', viewValue: 'April' },
    { value: '05', viewValue: 'May' },
    { value: '06', viewValue: 'June' },
    { value: '07', viewValue: 'July' },
    { value: '08', viewValue: 'August' },
    { value: '09', viewValue: 'September' },
    { value: '10', viewValue: 'October' },
    { value: '11', viewValue: 'November' },
    { value: '12', viewValue: 'December' },

  ];

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
  displayedColumns: string[] = ['invoiceNumbers', 'invoiceDate', 'departmentName', 'designation', 'clientName', 'amount'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filterInput") filter: ElementRef;
  branchs: District[];
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
  district: District[];
  branch: Positions[];

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
      branchId: new FormControl(''),
      year: new FormControl(''),
      month: new FormControl(''),
    })
  }
  get control() {
    return this.basicForm.controls
  }
  reset() {
    this.basicForm.patchValue({
      districtId: '',
      branchId: '',
      year: '',
      month: ''

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
    this.getDistrict()
  }
  onItemsSelect(event: any) {
    var obj = {
      'customerId': this.customerId,
      'districtId': event.value
    }
    this.userData.getClient(obj).subscribe((data) => {
      this.clients = data.responseModel;
      console.log(data)
    })
  }
  getDistrict() {
    var obj = {
      'customerId': this.customerId,
    }
    this.userData.getbranch(obj).subscribe((data) => {
      this.district = data.responseModel;
      console.log(data)
    })
  }

  Daily() {
    var form = this.basicForm.value;

    let obj = {
      'limit': this.limit,
      'districtId': form?.districtId,
      'offset': this.offset,
      "branchId": form?.branchId,
      "customerId": this.customerId,
      "month": form?.month,
      "year": form?.year
    }
    this.userData.empassign(obj).subscribe((data) => {
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
