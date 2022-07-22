import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { constant, getYears } from 'src/app/core/helpers/global.helper';
import { ConfigService } from 'src/app/core/service/congif.service';
import { Department } from '../../department/Department-Model/department.model';
import { Positions } from '../../job-position/Model/positions.model';
import { PaginationDTO } from '../../model/paginationDTO';
import { FileUpload } from '../Model/file.model';
import { ReportService } from '../service/report.service';
export interface Month {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-tax-deduction',
  templateUrl: './tax-deduction.component.html',
  styleUrls: ['./tax-deduction.component.scss']
})
export class TaxDeductionComponent implements OnInit {

  customerId: string;
  branchIds: string;
  branchs: any;
  clients: any;
  branch: any;
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
  currentPageDataSize: number = 0;
  basicForm: FormGroup;
  departments: Department[];
  designation: Positions[];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = ['districtName', 'branchName', 'stax', 'ctax'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filterInput") filter: ElementRef;
  pageSizeOptions: any;
  paginationDTO: any;
  offset: any;
  limit: any;
  value: string;

  constructor(private config: ConfigService, private modelService: ReportService) {
    this.config.init();
    this.customerId = config.customerId;
    this.branchIds = config.districtId;
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
    this.getReport()

    this.paginator.pageIndex = this.paginationDTO.offset;
    this.paginator.pageSize = this.paginationDTO.limit;
    this.paginator.length = this.paginationDTO.totalSize;


    //clear selection
    this.selection = new SelectionModel<FileUpload>(true, []);

    // Refreshing table using paginator

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.paginationDTO.searchWith = filterValue;
    this.getReport();
  }
  Filter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  onPaginateChange(event) {
    this.offset = event.pageIndex;
    this.limit = event.pageSize;
    this.getReport();
  }
  form() {
    this.basicForm = new FormGroup({
      type: new FormControl(''),
      districtId: new FormControl(''),
      branchId: new FormControl(''),
      departmentId: new FormControl(''),
    })

  }
  ngOnInit(): void {
    this.form();
    this.getBranch();
    this.getemployee();
    this.getDep();
  }
  getBranch() {
    var obj = {
      'customerId': this.customerId,
    }
    this.modelService.getbranch(obj).subscribe((data) => {
      this.branchs = data.responseModel;
      console.log(data)
    })
  }
  onItemsSelect(event: any) {
    var obj = {
      'customerId': this.customerId,
      'districtId': event.value
    }
    this.modelService.getClient(obj).subscribe((data) => {
      this.clients = data.responseModel;
      console.log(data)
    })
  }
  getemployee() {
    var obj = {
      'customerId': this.customerId,
      'districtId': this.branchIds,
    }
    this.modelService.getemployee(obj).subscribe((data) => {
      this.branch = data.responseModel;
      console.log(data)
    })
  }
  getDep() {
    var obj = {
      'customerId': this.customerId
    }
    this.modelService.getDepartment(obj).subscribe((data) => {
      this.departments = data.responseModel
      console.log(data)
    })
  }
  onItemSelect(event: any) {
    var obj = {
      'departmentId': event.value,
      'customerId': this.customerId
    }
    this.modelService.getPosition(obj).subscribe((data) => {
      this.designation = data.responseModel;
      console.log(data)
    })
  }
  getReport() {
    var form = this.basicForm.value;

    let obj = {
      'limit': this.limit,
      'offset': this.offset,
      "branchId": form?.branchId,
      "customerId": this.customerId,
      "districtId": form?.districtId
    }
    this.modelService.taxReport(obj).subscribe((data) => {
      this.paginationDTO.totalSize = data.pageSize;
      this.currentPageDataSize = data.responseModel.length;
      this.dataSource.data = data.responseModel;
      this.dataSource.sort = this.sort;
    })
  }

}
