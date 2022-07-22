import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { getYears } from 'src/app/core/helpers/global.helper';
import { ApiService } from 'src/app/core/service/api.service';
import { ConfigService } from 'src/app/core/service/congif.service';
import { District } from '../../branch-management/Model/branch.model';
import { Department } from '../../department/Department-Model/department.model';
import { Employees } from '../../employee/Model/employees.model';
import { ReportService } from '../service/report.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
export interface Month {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-out-staff',
  templateUrl: './out-staff.component.html',
  styleUrls: ['./out-staff.component.scss']
})
export class OutStaffComponent implements OnInit {

  basicForm: FormGroup;
  dailyAtten: any = [];
  dailyAttenDatas = [];
  indiviAtten: any = [];
  depts: Department[];
  dataSourceindividual1 = new MatTableDataSource<any>();
  dataSourceindividual = new MatTableDataSource<any>();
  customerId: string;
  districtId: string;
  responseModel: any
  displayedColumns2: string[] = ['employeeName', 'employeeId', 'finalSalary', 'presentCount', 'esi', 'epf'];
  displayedColumns1: string[] = ['employeeName', 'employeeId', 'finalSalary', 'presentCount', 'esi', 'epf'];
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
  departments: Department[];
  employees: any
  employee: Employees[];
  branchIds: any;
  branch: District[];
  branchs: any;
  clients: District[];
  pdfName: any;
  type: any;
  data: any;
  constructor(private config: ConfigService, private modelService: ReportService, private getService: ApiService) {
    this.config.init();
    this.customerId = config.customerId;
    this.branchIds = config.districtId;
  }

  ngOnInit(): void {
    this.form();
    this.getBranch();
    this.getemployee();
  }
  form() {
    this.basicForm = new FormGroup({
      type: new FormControl(''),
      districtId: new FormControl(''),
      branchId: new FormControl(''),
      employeeId: new FormControl(''),
      month: new FormControl(''),
      year: new FormControl(''),
    })

  }
  get control() {
    return this.basicForm.controls
  }
  reset() {
    this.basicForm.patchValue({
      month: '',
      year: '',
      employeeId: '',
      districtId: '',


    })
  }
  dateChange() {
    this.basicForm.patchValue({
      toDate: '',
    })
  }
  typeChange(event) {
    this.type = event.value
    this.reset();
    this.dailyAtten = [];
    this.dailyAttenDatas = [];
    this.indiviAtten = [];
    this.dataSourceindividual = new MatTableDataSource<any>();
    this.dataSourceindividual1 = new MatTableDataSource<any>();
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
  getIndividulAtten() {
    this.dailyAtten = [];
    var form = this.basicForm.value;
    if (form?.employeeId != '' && form?.month != '' && form?.year != '') {
      this.dataSourceindividual = new MatTableDataSource<any>();
      let obj = {
        "customerId": this.customerId,
        "employeeId": form?.employeeId,
        "month": form?.month,
        "year": form?.year
      }

      this.modelService.outIndiviual(obj).subscribe((res) => {
        this.dailyAtten = res?.responseModel
        this.dataSourceindividual = new MatTableDataSource<any>([res?.responseModel])
      })
    }
  }
  getMonthlyAtten() {
    this.dailyAtten = [];
    this.dailyAttenDatas = [];
    var form = this.basicForm.value;
    if (form?.districtId != '' && form?.month != '' && form?.year != '') {
      this.dataSourceindividual1 = new MatTableDataSource<any>();
      let obj = {
        "customerId": this.customerId,
        "districtId": form?.districtId,
        "branchId": form?.branchId,
        "month": form?.month,
        "year": form?.year
      }
      this.modelService.outSalary(obj).subscribe((res) => {
        this.dailyAtten = res?.responseModel
        this.dataSourceindividual1 = new MatTableDataSource<any>(res?.responseModel)
      })
    }
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
  onItemSelect(event: any) {
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
      'employeeType': 2,
      'customerId': this.customerId,
      'districtId': this.branchIds,
    }
    this.modelService.getemployee(obj).subscribe((data) => {
      this.branch = data.responseModel;
      console.log(data)
    })
  }
  downloadIndivitual() {
    if (this.type == 'Individual') {
      var form = this.basicForm.value;
      if (form?.month != '' && form?.year != '') {
        this.dataSourceindividual1 = new MatTableDataSource<any>();
        let obj = {
          "employeeId": form?.employeeId,
          "customerId": this.customerId,
          "month": form?.month,
          "year": form?.year
        }
        this.getService.downloadMonthly('attendance/get-outside-staff/salary-report/pdf/daily', obj).subscribe((data) => {
          switch (data.type) {
            case HttpEventType.DownloadProgress:
              break;
            case HttpEventType.Response:
              const downloadedFile = new Blob([data.body], {
                type: data.body.type,
              });
              const a = document.createElement("a");
              a.setAttribute("style", "display:none;");
              document.body.appendChild(a);
              a.download =
                this.pdfName ??
                "Employee" + " - " + "Salary - Report";
              a.href = URL.createObjectURL(downloadedFile);
              a.target = "_blank";
              a.click();
              document.body.removeChild(a);
              break;
          }
        });
      }
    }
    else {
      var form = this.basicForm.value;
      if (form?.districtId != '' && form?.month != '' && form?.year != '') {
        this.dataSourceindividual1 = new MatTableDataSource<any>();
        let obj = {
          "customerId": this.customerId,
          "districtId": form?.districtId,
          "branchId": form?.branchId,
          "month": form?.month,
          "year": form?.year
        }
        this.getService.downloadMonthly('attendance/get-outside-staff/salary-report/pdf/monthly', obj).subscribe((data) => {
          switch (data.type) {
            case HttpEventType.DownloadProgress:
              break;
            case HttpEventType.Response:
              const downloadedFile = new Blob([data.body], {
                type: data.body.type,
              });
              const a = document.createElement("a");
              a.setAttribute("style", "display:none;");
              document.body.appendChild(a);
              a.download =
                this.pdfName ??
                "Employee" + " - " + "Salary - Report";
              a.href = URL.createObjectURL(downloadedFile);
              a.target = "_blank";
              a.click();
              document.body.removeChild(a);

              break;
          }
        });
      }
    }
  }
}
