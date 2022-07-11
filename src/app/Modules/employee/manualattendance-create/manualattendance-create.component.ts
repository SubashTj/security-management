import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/core/service/congif.service';
import { Department } from '../../department/Department-Model/department.model';
import { EmployeeService } from '../service/employee.service';
import Swal from 'sweetalert2';
import { appSetting } from 'src/app/core/helpers/app-config.helper';
import { AppLoaderService } from 'src/app/core/service/app-loader.service';
import { ToastService } from 'src/app/core/service/toaster.service';
import { PermissionService } from 'src/app/core/service/permission.service';
import { AttendenceList } from '../Model/manual-attendence.model';
import { format, isThursday } from 'date-fns';
import { District } from '../../branch-management/Model/branch.model';
interface Month {
  month: string,
  monthName: string
}
interface Day {
  presentDays: string,
  day: string
}
export interface Empstatus {
  attendanceType: string;
  view: string;
}
export interface Leave {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-manualattendance-create',
  templateUrl: './manualattendance-create.component.html',
  styleUrls: ['./manualattendance-create.component.scss']
})
export class ManualattendanceCreateComponent implements OnInit {
  manualattendanceForm: FormGroup;
  getattendanceForm: FormGroup
  defaultTimeFormat = Number(appSetting().timeFormat);
  selectedValue: string = '';
  days: Day[] = [
    { presentDays: '1', day: '1' },
    { presentDays: '2', day: '2' },
    { presentDays: '3', day: '3' },
    { presentDays: '4', day: '4' },
    { presentDays: '5', day: '5' },
    { presentDays: '6', day: '6' },
    { presentDays: '7', day: '7' },
    { presentDays: '8', day: '8' },
    { presentDays: '9', day: '9' },
    { presentDays: '10', day: '10' },
    { presentDays: '11', day: '11' },
    { presentDays: '12', day: '12' },
    { presentDays: '13', day: '13' },
    { presentDays: '14', day: '14' },
    { presentDays: '15', day: '15' },
    { presentDays: '16', day: '16' },
    { presentDays: '17', day: '17' },
    { presentDays: '18', day: '18' },
    { presentDays: '19', day: '19' },
    { presentDays: '20', day: '20' },
    { presentDays: '21', day: '21' },
    { presentDays: '22', day: '22' },
    { presentDays: '23', day: '23' },
    { presentDays: '24', day: '24' },
    { presentDays: '25', day: '25' },
    { presentDays: '26', day: '26' },
    { presentDays: '27', day: '27' },
    { presentDays: '28', day: '28' },
    { presentDays: '29', day: '29' },
    { presentDays: '30', day: '30' },
    { presentDays: '31', day: '31' },

  ]
  months: Month[] = [
    { month: '1', monthName: 'January' },
    { month: '2', monthName: 'February' },
    { month: '3', monthName: 'March' },
    { month: '4', monthName: 'April' },
    { month: '5', monthName: 'May' },
    { month: '6', monthName: 'June' },
    { month: '7', monthName: 'July' },
    { month: '8', monthName: 'August' },
    { month: '9', monthName: 'September' },
    { month: '10', monthName: 'October' },
    { month: '11', monthName: 'November' },
    { month: '12', monthName: 'December' },

  ];
  empstatuses: Empstatus[] = [
    { attendanceType: '1', view: 'Present ' },
    { attendanceType: '2', view: 'Absent ' },
    { attendanceType: '3', view: 'Leave ' },
  ];

  leaves: Leave[] = [
    { value: '1', viewValue: 'Full day' },
    { value: '2', viewValue: 'First half of the day' },
    { value: '3', viewValue: 'Second half of the day' }
  ];
  deptId: any;
  date: any;
  shiftId: any;
  attenEmp: any = [];
  count: any;
  employeelength: any;
  attenTime: any;

  districtId: string;
  departmentId: any;
  positionId: any;
  data: any;
  thisDate: any
  departmentName: any;
  designation: any;
  details: any;
  checkIn: any;
  departments: Department[];
  customerId: any;
  clients: District[];
  todayDate
  branchId: any;
  designationId: any;
  attendanceDate: any;
  constructor(
    private formBuilder: FormBuilder,
    private modelService: EmployeeService,
    private router: Router,
    private loader: AppLoaderService,
    private toaster: ToastService,
    public permission: PermissionService,
    private activateRoute: ActivatedRoute,
    private config: ConfigService
  ) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = this.activateRoute.snapshot.params['districtId'];
    this.thisDate = format(new Date(), "yyyy-MM-dd");
  }

  ngOnInit() {
    this.getattendanceForm = new FormGroup({
      branchId: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
      departmentId: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
      designationId: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
    })

    this.manualattendanceForm = this.formBuilder.group({
      attendence: new FormArray([this.getattendenceList([])]),
    });
    this.getDep();
    this.getClient();
  }
  getClient() {
    var obj = {
      'customerId': this.customerId,
      'districtId': this.districtId
    }
    this.modelService.getClient(obj).subscribe((data) => {
      this.clients = data.responseModel;
      console.log(data)
    })
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
  private getattendenceList(atten) {
    this.employeelength = atten.length;
    var checkin;
    var checkout;

    return new FormGroup({
      employeeId: new FormControl(atten.employeeId),
      employeeName: new FormControl(atten.employeeName),
      shiftName: new FormControl(String(atten.shiftName)),
      presentDays: new FormControl(String(atten.presentDays)),
      departmentId: new FormControl(String(this.departmentId)),
      designationId: new FormControl(String(this.designationId)),
      customerId: new FormControl(String(this.customerId)),
      districtId: new FormControl(String(this.districtId)),
      branchId: new FormControl(String(this.branchId)),
      month: new FormControl(String(atten.month)),
    });
  }
  validateChange(value, i: number, id) {
    const control = <FormArray>this.manualattendanceForm.controls["attendence"];
    if (value == '2') {
      this.approvalValid(i, 'notvalid');
    } else if (value == '3') {
      this.approvalValid(i, 'notvalid');
    } else if (value == '4') {
      this.approvalValid(i, 'notvalid');
    } else {
      this.approvalValid(i, 'valid');
    }
    this.attendanceTime(value, i, id)
  }
  attendanceTime(value, i, id) {
    const control = <FormArray>this.manualattendanceForm.controls["attendence"];
    if (value != 2 && value != 3 && value != 4) {
      control.controls[i].get('checkIn').setValue(this.attenTime.checkIn.substring(0, 5));
      control.controls[i].get('checkOut').setValue(this.attenTime.checkout.substring(0, 5));
    }
  }

  approvalValid(i, attendanceType) {
    const control = <FormArray>this.manualattendanceForm.controls["attendence"];
  }
  populateAttendence(particulars: AttendenceList[]) {
    var control = <FormArray>this.manualattendanceForm.get("attendence");
    control.clear();
    particulars.forEach((part) => {
      control.push(this.getattendenceList(part));
    });
  }
  Discard() {
    this.router.navigate(['employee/manualattendance'])
  }
  Submit() {

  }
  getAttendance(post) {
    post.customerId = this.customerId;
    post.districtId = this.districtId

    this.modelService.attendence(post).subscribe((res) => {
      this.attenEmp = res.responseModel
      // this.details = res.responseModel.departmentDetails
      // this.departmentName = this.details.departmentName
      // this.designation = this.details.designation
      // this.count = this.details.count
      this.populateAttendence(this.attenEmp)
    })
    this.branchId = post.branchId
    this.departmentId = post.departmentId
    this.designationId = post.designationId
  }
  updateAttendence(post) {
    this.modelService.attendenceCreate(post).subscribe((res) => {
      if (res.statusMessage == "Success") {
        Swal.fire({
          icon: "success",
          title: "Manual Attendance Create Successfull",
          timer: 2500
        })
      } else {
        Swal.fire({
          icon: "error",
          title: "Manual Attendance Create Failed",
          timer: 2500

        })
      }
    });
  };
}


