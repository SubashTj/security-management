import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { ConfigService } from 'src/app/core/service/congif.service';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/helpers/format-datepicker';
import { AppDisplayTimePipe, AppServerDatePipe } from 'src/app/shared/pipes/app-config.pipe';
import { Employees } from '../../employee/Model/employees.model';
import { ReportService } from '../service/report.service';

@Component({
  selector: 'app-no-moment',
  templateUrl: './no-moment.component.html',
  styleUrls: ['./no-moment.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    AppServerDatePipe,
    AppDisplayTimePipe
  ],
})
export class NoMomentComponent implements OnInit {
  basicForm: FormGroup;
  dailyAtten: any = [];
  dailyAttenDatas = [];
  indiviAtten = [];
  customerId: string;
  districtId: string;
  departments: any;
  designation: any;
  employee: Employees[];

  constructor(private severdatePipe: AppServerDatePipe, private config: ConfigService, private modelService: ReportService) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }

  ngOnInit(): void {
    this.form();
    this.getDep();
  }
  form() {
    this.basicForm = new FormGroup({
      type: new FormControl('', [Validators.required]),
    })
  }
  reset() {
    this.basicForm.patchValue({
      date: '',
      depart: '',
      position: '',
      empId: '',
      fromDate: '',
      toDate: '',

    })
  }

  dateChange() {
    this.basicForm.patchValue({
      toDate: '',
    })
  }

  getFormatedDate(date) {
    return this.severdatePipe.transform(date);
  }

  typeChange() {
    this.reset();
    this.dailyAtten = [];
    this.dailyAttenDatas = [];
    this.indiviAtten = [];
  }
  get control() {
    return this.basicForm.controls
  }
  typebasedValidate(value) {
    if (value == "Daily") {
      this.basicForm.removeControl("depart");
      this.basicForm.removeControl("position");
      this.basicForm.removeControl("empId");
      this.basicForm.removeControl("depart");
      this.basicForm.removeControl("fromDate");
      this.basicForm.removeControl("toDate");
      this.basicForm.addControl("date", new FormControl("", [Validators.required]));
    } else if (value == "Individual") {
      this.basicForm.removeControl("empId");
      this.basicForm.removeControl("depart");
      this.basicForm.removeControl("fromDate");
      this.basicForm.removeControl("toDate");
      this.basicForm.removeControl("position");
      this.basicForm.removeControl("date");
      this.basicForm.addControl("empId", new FormControl("", [Validators.required]));
      this.basicForm.addControl("position", new FormControl("", [Validators.required]));
      this.basicForm.addControl("depart", new FormControl("", [Validators.required]));
      this.basicForm.addControl("fromDate", new FormControl("", [Validators.required]));
      this.basicForm.addControl("toDate", new FormControl("", [Validators.required]));
      this.basicForm.get("empId").markAsUntouched();
      this.basicForm.get("depart").markAsUntouched();
      this.basicForm.get("fromDate").markAsUntouched();
      this.basicForm.get("toDate").markAsUntouched();
      this.basicForm.get("position").markAsUntouched();
    }

  }
  getEmployee() {
    var obj = {
      'customerId': this.customerId,
      'districtId': this.districtId
    }
    this.modelService.getList(obj).subscribe((data) => {
      this.employee = data.responseModel;
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
    let departmentId = []
    departmentId = (event.value)
    var obj = {
      'departmentId': departmentId,
      'customerId': this.customerId,
      'districtId': this.districtId
    }
    this.modelService.getPosition(obj).subscribe((data) => {
      this.designation = data.responseModel
      console.log(data)
    })
  }
  getDailyAtten() {
    this.dailyAtten = [];
    this.dailyAttenDatas = [];
    var form = this.basicForm.value;
    const date = this.severdatePipe.transform(form?.date);
    if (date != '') {
      let formData = new FormData();
      formData.append('thisDate', date);
      let obj = {
        "customerId": this.customerId,
        "districtId": this.districtId,
        "thisDate": date
      }
      this.modelService.getDailyAtten(obj).subscribe((res) => {
        if (res.datas.length > 0) {
          this.dailyAtten = res.datas;

        } else {
          this.dailyAtten = [];

        }

      });
    }

  }
  getIndividulAtten() {
    var form = this.basicForm.value;
    const fromDate = this.severdatePipe.transform(form?.fromDate);
    const toDate = this.severdatePipe.transform(form?.toDate);
    if (form?.depart != '' && form?.position != '' && form?.empId != '' && fromDate != '' && toDate != '') {
      this.indiviAtten = [];
      let obj = {
        "customerId": this.customerId,
        "districtId": this.districtId,
        "employeeId": form?.empId,
        "fromDate": fromDate,
        "toDate": toDate
      }
      this.modelService.getIndividualAtten(obj).subscribe((res) => {
        if (res?.datas.length > 0) {
          this.indiviAtten = res?.datas;
        } else {

          this.indiviAtten = [];

        }

      });
    }
  }
}
