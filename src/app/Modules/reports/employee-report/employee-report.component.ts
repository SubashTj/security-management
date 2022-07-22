import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/helpers/format-datepicker';
import { AppServerDatePipe } from 'src/app/shared/pipes/app-config.pipe';
import { Employees } from '../../employee/Model/employees.model';
import { ReportService } from '../service/report.service';

@Component({
  selector: 'app-employee-report',
  templateUrl: './employee-report.component.html',
  styleUrls: ['./employee-report.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    AppServerDatePipe,
  ],
})
export class EmployeeReportComponent implements OnInit {
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
  displayedColumns: string[] = ['name', 'departmentName', 'speciality', 'employeeId', 'mac', 'topic', 'thisDate', 'inTimestamp', 'outTimestamp', 'difference'];

  @ViewChild(MatSort) sort: any;
  dataSource = new MatTableDataSource<Employees>();
  selection = new SelectionModel<Employees>(true, []);
  constructor(private userData: ReportService, private severdatePipe: AppServerDatePipe,) { }

  form() {
    this.basicForm = new FormGroup({
      thisDate: new FormControl(''),
      employeeId: new FormControl('')
    })
  }
  get control() {
    return this.basicForm.controls
  }
  reset() {
    this.basicForm.patchValue({
      thisDate: '',
      employeeId: ''

    })
  }
  setType(event: any) {
    this.isVisible = event.value;
    this.selectedValue = this.isVisible;
    console.log(event.value);
    console.log(this.selectedValue === 'Daily');
  }

  ngOnInit(): void {
    this.form();
  }

  Daily() {
    var form = this.basicForm.value;
    const thisDate = this.severdatePipe.transform(form?.thisDate);
    let obj = {
      "employeeId": form?.employeeId,
      "thisDate": thisDate
    }
    this.userData.empreport(obj).subscribe((data) => {
      this.resourcesLoaded = false;
      this.dataSource.data = data.responseModel;
      this.dataSource.sort = this.sort;
      console.log(this.Report);
    })
    this.show = true;
  }
}
