import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { getYears } from 'src/app/core/helpers/global.helper';
import { ConfigService } from 'src/app/core/service/congif.service';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/helpers/format-datepicker';
import { AppServerDatePipe } from 'src/app/shared/pipes/app-config.pipe';
import { Department } from '../../department/Department-Model/department.model';
import { Employees } from '../Model/employees.model';
import { EmployeeService } from '../service/employee.service';
export interface Month {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-timeattendance',
  templateUrl: './timeattendance.component.html',
  styleUrls: ['./timeattendance.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    AppServerDatePipe,
  ],
})
export class TimeattendanceComponent implements OnInit {
  basicForm: FormGroup;
  dailyAtten: any = [];
  dailyAttenDatas = [];
  indiviAtten:any= [];
  depts: Department[];
  dataSourceindividual = new MatTableDataSource<any>();
  customerId: string;
  districtId: string;
  responseModel:any
  displayedColumns: string[] = ['employeeId','employeeName', 'checkIn', 'checkOut', 'officeActualTime', 'activity'];

  displayedColumns2: string[] = ['employeeName','employeeId', 'totalschooltime', 'totalactivetime', 'averageschooltime', 'averageactivetime', 'productivitytime'];
  displayedColumns1: string[] = ['date', 'clockinindividual', 'clockoutindividual', 'officeActualTime',
    'activity'];
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
  departments:Department[];
  employees:any
  employee:Employees[];

  constructor(private config:ConfigService,private modelService:EmployeeService,private severdatePipe: AppServerDatePipe,) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
   }

  ngOnInit(): void {
    this.form();
    this.getDep();
    this.getEmployees()
  }
  form() {
    this.basicForm = new FormGroup({
      type: new FormControl(''),
      date: new FormControl(''),
      month: new FormControl(''),
      year: new FormControl(''),
      departmentId: new FormControl(''),
      employeeId: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
    })
    
  }
  get control() {
    return this.basicForm.controls
  }
  reset() {
    this.basicForm.patchValue({
      date: '',
      month: '',
      year: '',
      departmentId: '',
      employeeId: '',
      fromDate: '',
      toDate: '',

    })
  }
  dateChange() {
    this.basicForm.patchValue({
      toDate: '',
    })
  }
  typeChange() {
    this.reset();
    this.dailyAtten = [];
    this.dailyAttenDatas = [];
    this.indiviAtten = [];
    this.dataSourceindividual = new MatTableDataSource<any>();
  }
  filterData(id, data) {
    return data.filter((x) => x.departmentId == id);
  }

  makeAttenData(data) {
    this.departments.forEach((res) => {
      this.dailyAttenDatas.push({
        departmentName: res?.departmentName,
        datas: this.filterData(res?.departmentId, data)
      })
    })

    this.dailyAttenDatas = this.dailyAttenDatas.filter((res) => res.datas.length != 0);

  }
  getDailyAtten() {
    this.dailyAtten = [];
    this.dailyAttenDatas = [];
    var form = this.basicForm.value;
    const fromDate = this.severdatePipe.transform(form?.fromDate);
    const toDate = this.severdatePipe.transform(form?.toDate);

      let obj = {
        "customerId": this.customerId,
        "districtId": this.districtId,
        "fromDate": fromDate,
        "toDate":toDate
      }
      this.modelService.getTimeDaily(obj).subscribe((res) => {
        this.dailyAtten=res.responseModel
        this.makeAttenData(res?.responseModel.timeBasedEmployeeDataModel);
      })

  }
  getMonthlyAtten() {
    this.dailyAtten = [];
    this.dailyAttenDatas = [];
    var form = this.basicForm.value;
    if (form?.month != '' && form?.year != '') {
      let obj = {

        "customerId": this.customerId,
        "districtId": this.districtId,
        "month": form?.month,
        "year": form?.year
      }
      this.modelService.getTimeMonthly(obj).subscribe((res) => {
        this.dailyAtten = res?.responseModel;
        this.makeAttenData(res?.responseModel.timeBasedEmployeeDataModel);
      })
    } 
  }
  getIndividulAtten() {
    var form = this.basicForm.value;
    const fromDate = this.severdatePipe.transform(form?.fromDate);
    const toDate = this.severdatePipe.transform(form?.toDate);
    if (form?.departmentId != '' && form?.employeeId != '' && fromDate != '' && toDate != '') {
      this.indiviAtten = [];
      this.dataSourceindividual = new MatTableDataSource<any>();
      let obj = {
        "customerId": this.customerId,
        "districtId": this.districtId,
        "employeeId": form?.employeeId,
        "departmentId":form?.departmentId,
        "fromDate": fromDate,
        "toDate": toDate
      }

      this.modelService.getTimeIndivitual(obj).subscribe((res) => {
      this.indiviAtten = res.responseModel.average_model;
      this.dataSourceindividual = new MatTableDataSource<any>(res?.responseModel.timeBasedEmployeeDataModel)
      })
    }
  }
  getDep() {
    var obj = {
      'customerId': this.customerId,
    }
    this.modelService.getDepartment(obj).subscribe((data) => {
      this.departments = data.responseModel
      console.log(data)
    })
  }
  
  getEmployees() {
    var obj = {
      'customerId': this.customerId,
      'districtId': this.districtId
    }
    this.modelService.GetList(obj).subscribe((data) => {
      this.employees =data.responseModel;
      console.log(data)
   
    })
  }

}
