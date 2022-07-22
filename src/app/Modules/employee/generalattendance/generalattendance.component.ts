import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { getYears } from 'src/app/core/helpers/global.helper';
import { ConfigService } from 'src/app/core/service/congif.service';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/helpers/format-datepicker';
import { AppServerDatePipe } from 'src/app/shared/pipes/app-config.pipe';
import Swal from 'sweetalert2';
import { Employees } from '../Model/employees.model';
import { EmployeeService } from '../service/employee.service';
export interface Month {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-generalattendance',
  templateUrl: './generalattendance.component.html',
  styleUrls: ['./generalattendance.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    AppServerDatePipe,
  ],
})
export class GeneralattendanceComponent implements OnInit {
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
  displayedColumns: string[] = ['employeeName', 'employeeId', 'date', 'type', 'checkIn', 'checkOut', 'workingHourNormal', 'workingHourReal', 'lateTime', 'lateMin', 'leaveearlyTime',
    'leaveEarlyMin', 'graceMinNormal', 'graceMinReal', 'attendanceDaysNormal', 'attendanceDaysReal'];
  basicForm: FormGroup;
  dataSource = new MatTableDataSource<any>();
  employeeDetail: any[];
  customerId: any;
  districtId: any;
  isShowing: boolean = false
  constructor(private employeeService: EmployeeService, private severdatePipe: AppServerDatePipe, private config: ConfigService) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }

  form() {
    this.basicForm = new FormGroup({
      type: new FormControl(''),
      inp_date: new FormControl(''),
      employeeId: new FormControl(''),
      start_date: new FormControl(''),
      end_date: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
    })
  }
  ngOnInit(): void {
    this.form();
  }

  get control() {
    return this.basicForm.controls
  }
  reset() {
    this.basicForm.patchValue({
      inp_date: '',
      employeeId: '',
      start_date: '',
      end_date: '',
      startDate: '',
      endDate: '',

    })
  }
  typeChange() {
    this.reset();
    this.dataSource.data = []

  }
  getDailyAtten() {
    var form = this.basicForm.value;
    const inp_date = this.severdatePipe.transform(form?.inp_date);
    if (inp_date != '') {
      let obj = {
        "customerId": this.customerId,
        "districtId": this.districtId,
        "inp_date": inp_date
      }
      this.employeeService.getDailyAtten(obj).subscribe((res) => {
        if (res?.statusMessage == 'Success') {
          this.dataSource = new MatTableDataSource<any>(res.responseModel);
          Swal.fire({
            icon: "success",
            title: "Daily General Attendance Listed  Successfully",
            timer: 2500

          });

        } else {
          Swal.fire({
            icon: "success",
            title: "Daily General Attendance Listed  Failed",
            timer: 2500
          });
        }
      })
    } else {
      this.checkRequired()
    }

  }
  checkRequired() {
    Swal.fire({
      title: "Check Required",
      text: "Fill Mandatory Fields",
      icon: "warning",
    });
  }
  getMonthlyAtten() {
    var form = this.basicForm.value;
    const start_date = this.severdatePipe.transform(form?.start_date);
    const end_date = this.severdatePipe.transform(form?.end_date);
    if (start_date != '' && end_date != '') {
      let obj = {
        "start_date": start_date,
        "end_date": end_date
      }

      this.employeeService.getMonthlyAtten(obj).subscribe((res) => {
        if (res?.statusMessage == 'Success') {
          this.dataSource = new MatTableDataSource<any>(res.responseModel);
          Swal.fire({
            icon: "success",
            title: "Monthly General Attendance Listed  Successfully",
            timer: 2500

          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Monthly General Attendance Listed  Failed",
            timer: 2500
          });
        }
      })
    } else {

    }
  }
  getIndividulAtten() {
    var form = this.basicForm.value;
    const startDate = this.severdatePipe.transform(form?.startDate);
    const endDate = this.severdatePipe.transform(form?.endDate);
    if (form?.employeeId != '' && startDate != '' && endDate != '') {
      let obj = {
        "employeeId": form?.employeeId,
        "startDate": startDate,
        "endDate": endDate
      }

      this.employeeService.getIndividualAtten(obj).subscribe((res) => {
        if (res?.statusMessage == 'Success') {
          this.dataSource = new MatTableDataSource<any>(res.responseModel);
          Swal.fire({
            icon: "success",
            title: "Individual General Attendance Listed  Successfully",
            timer: 2500

          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Individual General Attendance Listed  Failed",
            timer: 2500
          });
        }
      })
    } else {
      this.checkRequired()
    }
  }

  dateChange() {
    this.basicForm.patchValue({
      toDate: '',
    })
  }


}
