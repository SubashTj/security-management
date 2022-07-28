import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/helpers/format-datepicker';
import { AppServerDatePipe } from 'src/app/shared/pipes/app-config.pipe';
import { Department } from '../../department/Department-Model/department.model';
import { Positions } from '../../job-position/Model/positions.model';
import { Qualification } from '../../qualification/Model/qualification.model';
import { BloodGroup } from '../Model/bloodgroup.model';
import { Employees } from '../Model/employees.model';
import { Nationality } from '../Model/nationality.model';
import { EmployeeService } from '../service/employee.service';
import { Country } from '../Model/country.model';
import Swal from 'sweetalert2';
import { ConfigService } from 'src/app/core/service/congif.service';
import { CropComponent } from 'src/app/shared/shared-component/crop/crop.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ShiftDetails } from '../../attendance-settings/Model/shift-details.model';
interface SalaryType {
  salaryType: string,
  salaryTypeId: string
}
@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    AppServerDatePipe
  ],
})
export class UpdateEmployeeComponent implements OnInit {
  salarytype: SalaryType[] = [
    { salaryTypeId: '1', salaryType: 'Daily' },
    { salaryTypeId: '2', salaryType: 'Weekly' },
    { salaryTypeId: '3', salaryType: 'Monthly' },
  ];
  @ViewChild(MatButton) submitButton: MatButton;
  macs: any
  todayDate
  countries: any = [];
  employees: Employees = new Employees();
  states: any = [];
  cities: any = [];
  employeeForm: FormGroup;
  selectedGender: number;
  selectedMarital: number;
  deptNames: any;
  speciality: any;
  posName: any;
  position: Positions = new Positions();
  departments: Department[];
  croppedImage: any = '';
  croppedImg: string = "assets/images/camera.png";
  designations: Positions[];
  qualifications: Qualification[];
  isFileSizeTooHigh: boolean;
  isFileResolutionHigh: boolean;
  isAttachmentFileSizeTooHigh: boolean;
  imageChangedEvent: any = '';
  employeeId: any;
  bloodgroup: BloodGroup[];
  nationality: Nationality[];
  religion: BloodGroup[];
  country: Country[];
  state: Country[];
  city: any;
  specialityId: string;
  gender: number;
  macAddress: string;
  customerId: string;
  districtId: string;
  Shift: ShiftDetails[];
  employeeType: any;
  districtIds: any;
  constructor(public dialog: MatDialog, private config: ConfigService, private dataService: EmployeeService, private severdatePipe: AppServerDatePipe, private activateRoute: ActivatedRoute) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl(""),
      userImage: new FormControl("", Validators.pattern(/(.*?)\.(jpg|jpeg|png)$/)),
      employeeId: new FormControl(""),
      departmentId: new FormControl(""),
      designationId: new FormControl(""),
      shiftId: new FormControl(""),
      mobileNumber: new FormControl(""),
      aadharNumber: new FormControl(""),
      experienceYear: new FormControl(""),
      experienceMonth: new FormControl(""),
      employeeType: new FormControl(""),
      esiNo: new FormControl(""),
      nomineeName: new FormControl(""),
      epfNo: new FormControl(""),
      accountNumber: new FormControl(""),
      salaryTypeId: new FormControl(""),
      salary: new FormControl(""),
      esiSalary: new FormControl(""),
      epfSalary: new FormControl(""),
      invoiceSalary: new FormControl(""),
      ifscCode: new FormControl(""),
      bloodGroupId: new FormControl(""),
      nationalityId: new FormControl(""),
      religionId: new FormControl(""),
      dateOfJoining: new FormControl("", [Validators.required]),
      dateOfBirth: new FormControl("", [Validators.required]),
      shirtSize: new FormControl(""),
      pantSize: new FormControl(""),
      shoeSize: new FormControl(""),
      qualificationId: new FormControl(""),
      gender: new FormControl(""),
      maritalStatus: new FormControl(""),
      addressLine1: new FormControl(""),
      addressLine2: new FormControl(""),
      countryId: new FormControl(""),
      stateId: new FormControl(""),
      cityId: new FormControl(""),
      zipcode: new FormControl("", [
        Validators.min(6),
        Validators.pattern(/^[0-9]{1,6}$/),
      ])
    })
    this.getDep();
    this.getQual();
    this.getOne();
    this.getNationality();
    this.getBloodgroup();
    this.getreligion();
    this.getcountry();
    this.getShift();
  }
  get control() {
    return this.employeeForm.controls;
  }
  save(post) {

    let formData = new FormData();
    formData.append('firstName', this.employeeForm.value.firstName);
    formData.append('lastName', this.employeeForm.value.lastName);
    formData.append('employeeId', this.employeeForm.value.employeeId);
    formData.append('departmentId', this.employeeForm.value.departmentId);
    formData.append('designationId', this.employeeForm.value.designationId);
    formData.append('shiftId', this.employeeForm.value.shiftId);
    formData.append('dateOfJoining', this.employeeForm.value.dateOfJoining);
    formData.append('mobileNumber', this.employeeForm.value.mobileNumber);
    formData.append('aadharNumber', this.employeeForm.value.aadharNumber);
    formData.append('experienceYear', this.employeeForm.value.experienceYear);
    formData.append('experienceMonth', this.employeeForm.value.experienceMonth);
    formData.append('employeeType', this.employeeForm.value.employeeType);
    formData.append('esiNo', this.employeeForm.value.esiNo);
    formData.append('epfNo', this.employeeForm.value.epfNo);
    formData.append('nomineeName', this.employeeForm.value.nomineeName);
    formData.append('accountNumber', this.employeeForm.value.accountNumber);
    formData.append('salaryTypeId', this.employeeForm.value.salaryTypeId);
    formData.append('salary', this.employeeForm.value.salary);
    formData.append('esiSalary', this.employeeForm.value.esiSalary);
    formData.append('epfSalary', this.employeeForm.value.epfSalary);
    formData.append('invoiceSalary', this.employeeForm.value.invoiceSalary);
    formData.append('ifscCode', this.employeeForm.value.ifscCode);
    if (this.employees.image) {
      formData.append('userImage', this.employees.image);
    }
    formData.append('bloodGroupId', this.employeeForm.value.bloodGroupId);
    formData.append('nationalityId', this.employeeForm.value.nationalityId);
    formData.append('religionId', this.employeeForm.value.religionId);
    formData.append('dateOfBirth', this.employeeForm.value.dateOfBirth);
    formData.append('shirtSize', this.employeeForm.value.shirtSize);
    formData.append('pantSize', this.employeeForm.value.pantSize);
    formData.append('shoeSize', this.employeeForm.value.shoeSize);
    formData.append('qualificationId', this.employeeForm.value.qualificationId);
    formData.append('gender', this.employeeForm.value.gender);
    formData.append('maritalStatus', this.employeeForm.value.maritalStatus);
    formData.append('addressLine1', this.employeeForm.value.addressLine1);
    formData.append('addressLine2', this.employeeForm.value.addressLine2);
    formData.append('countryId', this.employeeForm.value.countryId);
    formData.append('stateId', this.employeeForm.value.stateId);
    formData.append('cityId', this.employeeForm.value.cityId);
    formData.append('zipcode', this.employeeForm.value.zipcode);
    formData.append('customerId', this.customerId)
    formData.append('districtId', this.districtIds)
    this.submitButton.disabled = true;
    this.dataService.Upadte(formData).subscribe((res: any) => {
      if (res.statusMessage == 'Success') {
        Swal.fire({
          icon: "success",
          title: "Employee-Detail Updated  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Employee-Detail Updated Failed",
          timer: 2500

        }).then(function () {
          window.location.reload();
        });

      }
    });
  }
  clearLogo() {
    this.croppedImg = "assets/images/camera.png";
    this.employees.imageDataUrl = '';
    this.employees.image = '';
    this.employeeForm.get('userImage').setValue('')
  }

  getDep() {
    var obj = {
      'customerId': this.customerId
    }
    this.dataService.getDepartment(obj).subscribe((data) => {
      this.departments = data.responseModel
      console.log(data)
    })
  }
  onItemSelect(event: any, position: Positions) {
    var obj = {
      'departmentId': position.departmentId,
      'customerId': this.customerId
    }
    this.dataService.getPosition(obj).subscribe((data) => {
      this.designations = data.responseModel;
      console.log(data)
    })
  }
  getQual() {
    var obj = {
      'customerId': this.customerId
    }
    this.dataService.getQualification(obj).subscribe((data) => {
      this.qualifications = data.responseModel
      console.log(data)
    })
  }
  getNationality() {
    this.dataService.getNational().subscribe((data) => {
      this.nationality = data.responseModel
      console.log(data)
    })
  }
  getBloodgroup() {
    this.dataService.getBlood().subscribe((data) => {
      this.bloodgroup = data.responseModel
      console.log(data)
    })
  }
  getreligion() {
    this.dataService.getReligion().subscribe((data) => {
      this.religion = data.responseModel
      console.log(data)
    })
  }
  getcountry() {
    this.dataService.getCountry().subscribe((data) => {
      this.country = data.responseModel
      console.log(data)
    })
  }

  selected(data) {

    let obj = {
      'countryId': data
    }
    this.dataService.getState(obj).subscribe((data) => {
      this.state = data.responseModel
      console.log(this.state)
    })
  }


  select(data) {
    let obj = {
      'stateId': data
    }
    this.dataService.getCity(obj).subscribe((data) => {
      this.city = data.responseModel
      console.log(this.city)
    })
  }
  getShift() {
    var obj = {
      'customerId': this.customerId
    }
    this.dataService.getDetails(obj).subscribe((data) => {
      this.Shift = data.responseModel;
      console.log(data)
    })
  }
  getOne() {
    this.employeeId = this.activateRoute.snapshot.params["id"];
    let obj = {
      'employeeId': this.employeeId,
      'customerId': this.customerId,
      'districtId': this.districtId
    }
    this.dataService.getOne(obj).subscribe((data) => {
      console.log(obj);
      this.employees = data.responseModel;
      this.setValues(this.employees);

    })
  }
  setValues(item: Employees) {
    this.croppedImg = `${environment.apiUrl}${item.userImage}` == "" ? "assets/images/camera.png" : `${environment.apiUrl}${item.userImage}`;
    this.macAddress = item.macAddress
    if (item.stateId) {
      this.selected(item.countryId)
    }
    if (item.cityId) {
      this.select(item.stateId)
    }
    this.employeeForm.patchValue({

      firstName: item.firstName,
      lastName: item.lastName,
      employeeId: item.employeeId,
      departmentId: item.departmentId,
      designationId: item.designationId,
      shiftId: item.shiftId,
      mobileNumber: item.mobileNumber,
      gender: Number(item.gender),
      aadharNumber: item.aadharNumber,
      epfNo: item.epfNo,
      esiNo: item.esiNo,
      nomineeName: item.nomineeName,
      accountNumber: item.accountNumber,
      ifscCode: item.ifscCode,
      salaryTypeId: item.salaryTypeId,
      experienceYear: item.experienceYear,
      experienceMonth: item.experienceMonth,
      employeeType: item.employeeType,
      bloodGroupId: item.bloodGroupId,
      nationalityId: item.nationalityId,
      religionId: item.religionId,
      dateOfJoining: item.dateOfJoining,
      dateOfBirth: item.dateOfBirth,
      qualificationId: item.qualificationId,
      maritalStatus: Number(item.maritalStatus),
      addressLine1: item.addressLine1,
      addressLine2: item.addressLine2,
      countryId: item.countryId,
      stateId: item.stateId,
      cityId: item.cityId,
      zipcode: item.zipcode,
      salary: item.salary,
      esiSalary: item.esiSalary,
      epfSalary: item.epfSalary,
      invoiceSalary: item.invoiceSalary,
      shirtSize: item.shirtSize,
      pantSize: item.pantSize,
      shoeSize: item.shoeSize
    });
    this.employees.image = `${environment.apiUrl}${item.userImage}`;
    this.selectedGender = Number(item.gender);
    this.selectedMarital = Number(item.maritalStatus);
    this.employeeType = Number(item.employeeType);
    this.districtIds = item.districtId

  }


  discard() {

  }
  fileChangeEvent(event): void {
    if (event.target.files[0]) {
      this.imageChangedEvent = event;
      if (event.target.files[0].size > 10000000) {
        this.isFileSizeTooHigh = true;
      } else if (event.target.files[0].size > 1200 * 800) {
        this.isFileSizeTooHigh = false;
        this.isFileResolutionHigh = true;
      } else {
        this.isFileResolutionHigh = false;
        this.isFileSizeTooHigh = false;
        if (!this.control.userImage.errors?.pattern)
          this.openCropBox(event.target.files[0]);
      }
    }
  }
  getUrl() {
    return "url('assets/images/camera.png')";
  }

  openCropBox($file) {
    const dialogRef = this.dialog.open(CropComponent, {
      width: "40%",
      data: { payload: $file }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.croppedImg = result?.dataUrl;
        this.employees.imageDataUrl = result?.dataUrl;
        this.employees.image = result?.blobData;
      }
    });
  }
  setSpecialityName(value) {
    this.speciality = value;
  }

  deptName(value) {
    this.deptNames = value;
  }

  positionNme(value) {
    this.posName = value;
  }
}

