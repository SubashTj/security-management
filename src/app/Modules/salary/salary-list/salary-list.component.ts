import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationDTO } from '../../model/paginationDTO';
import { Salary } from '../Model/salary.model';
import Swal from 'sweetalert2';
import { ConfigService } from 'src/app/core/service/congif.service';
import { MatDialog } from '@angular/material/dialog';
import { AppLoaderService } from 'src/app/core/service/app-loader.service';
import { constant } from 'src/app/core/helpers/global.helper';
import { SalaryService } from '../salary.service';

import { FormControl, FormGroup } from '@angular/forms';
import { District } from '../../branch-management/Model/branch.model';
interface Month {
  month: string,
  monthName: string
}
interface Year {
  year: string,
}
@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrls: ['./salary-list.component.scss']
})
export class SalaryListComponent implements OnInit {


  months: Month[] = [
    { month: '01', monthName: 'January' },
    { month: '02', monthName: 'February' },
    { month: '03', monthName: 'March' },
    { month: '04', monthName: 'April' },
    { month: '05', monthName: 'May' },
    { month: '06', monthName: 'June' },
    { month: '07', monthName: 'July' },
    { month: '08', monthName: 'August' },
    { month: '09', monthName: 'September' },
    { month: '10', monthName: 'October' },
    { month: '11', monthName: 'November' },
    { month: '12', monthName: 'December' },

  ];
  years: Year[] = [
    { year: '2021' },
    { year: '2022' },
    { year: '2023' },
    { year: '2024' },
    { year: '2025' },
    { year: '2026' },
    { year: '2027' },
    { year: '2028' },
    { year: '2029' },
    { year: '2030' },
    { year: '2031' },
    { year: '2033' },
    { year: '2034' },
    { year: '2035' },
    { year: '2036' },
    { year: '2037' },
    { year: '2038' },
    { year: '2039' },
    { year: '2040' },
    { year: '2041' },
    { year: '2042' },
    { year: '2043' },
    { year: '2044' },
    { year: '2045' },
    { year: '2046' },
    { year: '2047' },
    { year: '2048' },
    { year: '2049' },
    { year: '2050' },

  ];
  basicForm: FormGroup;
  displayedColumns: string[] = ['employeeId', 'employeeName', 'finalSalary', 'presentCount', 'employeePF', 'employeeESI'];
  dataSource = new MatTableDataSource<Salary>();
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<Salary>(true, []);
  speciality: any;
  specialityId: any;
  employeeId: string;
  paginationDTO: PaginationDTO = new PaginationDTO();
  pageSizeOptions: any = 0;
  value = "";
  customerId: string;
  districtId: string;
  department: Salary;
  departments: any;
  branch: District[];
  isVisible: any;
  selectedValue: any;
  resourcesLoaded: boolean;
  datepipe: any;
  branchIds: string;
  branchs: District[];

  constructor(private config: ConfigService, public dialog: MatDialog, private getService: SalaryService, private loader: AppLoaderService) {
    this.config.init();
    this.customerId = config.customerId;
    this.branchIds = config.districtId;
    this.pageSizeOptions = constant().app.table.filtering.pageSizeOptions;
  }
  ngOnInit(): void {
    this.basicForm = new FormGroup({
      employeeId: new FormControl(''),
      districtId: new FormControl(''),
      month: new FormControl(''),
      year: new FormControl(''),

    })
    this.getBranch();
    this.getemployee();
  }
  getBranch() {
    var obj = {
      'customerId': this.customerId,
    }
    this.getService.getbranch(obj).subscribe((data) => {
      this.branchs = data.responseModel;
      console.log(data)
    })
  }
  getemployee() {
    var obj = {
      'customerId': this.customerId,
      'districtId': this.branchIds,
    }
    this.getService.getemployee(obj).subscribe((data) => {
      this.branch = data.responseModel;
      console.log(data)
    })
  }
  Monthly(post) {
    var form = this.basicForm.value;
    post.customerId = this.customerId;
    this.getService.salary(post).subscribe((data) => {
      this.dataSource = new MatTableDataSource<Salary>(data.responseModel);
    })

  }
  Daily(post) {
    var form = this.basicForm.value;
    post.customerId = this.customerId;
    this.getService.salaryIndiviual(post).subscribe((data) => {
      this.dataSource = new MatTableDataSource<Salary>(data.responseModel);
    })

  }
  setType(event: any) {
    this.isVisible = event.value;
    this.selectedValue = this.isVisible;
    // console.log(event.value);
    console.log(this.selectedValue === 'Monthly');
    console.log(this.selectedValue === 'Individual');
  }


}
