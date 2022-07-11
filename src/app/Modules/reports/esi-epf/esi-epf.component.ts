import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { constant, getYears } from 'src/app/core/helpers/global.helper';
import { ConfigService } from 'src/app/core/service/congif.service';
import { District } from '../../branch-management/Model/branch.model';
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
  selector: 'app-esi-epf',
  templateUrl: './esi-epf.component.html',
  styleUrls: ['./esi-epf.component.scss']
})
export class EsiEpfComponent implements OnInit {

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
  displayedColumns: string[] = ['employeeId', 'employeeName','salary','Esi','Epf'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filterInput") filter: ElementRef;

  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
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
  departments: Department[];

  constructor(private userData: ReportService, private config: ConfigService) {
    this.customerId = config.customerId;
    this.districtId = config.districtId;
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
    this.selection = new SelectionModel<any>(true, []);

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

      branchId: new FormControl(''),
      districtId: new FormControl(''),
      departmentId: new FormControl('')
    })
  }
  get control() {
    return this.basicForm.controls
  }
  reset() {
    this.basicForm.patchValue({

      branchId: '',
      districtId:'',
      departmentId:''

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
    this.getDep();
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
  getDep() {
    var obj = {
      'customerId': this.customerId
    }
    this.userData.getDepartment(obj).subscribe((data) => {
      this.departments = data.responseModel
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
      "districtId": form?.districtId,
      "departmentId":form?.departmentId
    }
    this.userData.esiepfReport(obj).subscribe((data) => {
      this.resourcesLoaded = false;
      this.paginationDTO.totalSize = data.pageSize;
      this.currentPageDataSize = data.responseModel.length;
      this.dataSource.data = data.responseModel;
      this.dataSource.sort = this.sort;
      console.log(this.Report);
    })
    this.show = true;
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

}
