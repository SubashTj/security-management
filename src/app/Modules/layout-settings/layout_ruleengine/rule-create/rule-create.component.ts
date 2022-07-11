import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from '../../Model/category.model';
import { LayoutPosition } from '../../Model/layoutposition.model';
import { RuleEngine } from '../../Model/ruleengine.model';
import { LayoutService } from '../../service/layout.service';
import Swal from 'sweetalert2';
import { Positions } from 'src/app/modules/job-position/Model/positions.model';
import { ConfigService } from 'src/app/core/service/congif.service';
import { DepartmentRoutingModule } from 'src/app/modules/department/department-routing.module';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Department } from 'src/app/modules/department/Department-Model/department.model';
@Component({
  selector: 'app-rule-create',
  templateUrl: './rule-create.component.html',
  styleUrls: ['./rule-create.component.scss']
})
export class RuleCreateComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  dropdownSetting = {};
  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  ruleengineForm: FormGroup;
  public data: any;
  empGen: any = [];
  dataSource: Category[];
  category: RuleEngine = new RuleEngine();
  Position: LayoutPosition[];
  allowed: any = [];
  departments: any = [];
  positions: Positions[];
  customerId: string;
  districtId: string;
  department: {}[];
  allSelected = false;
  select: any;
  departmentIds = []
  departmentModel = {}
  selectedDepartmentArray: any;
  id: any;
  selected: any;
  SelectedDepartment: any
  departmentId: any;
  MultipleDepartment: any = [];
  designationId = [];
  job: any;
  positionDepartment: any;
  designations: any;
  isLoaded = false;
  constructor(public dialogRef: MatDialogRef<RuleCreateComponent>, public dialog: MatDialog, private getService: LayoutService, private router: Router, private config: ConfigService) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.ruleengineForm = new FormGroup({
      layoutId: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
      positionId: new FormControl('', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]),
      departmentId: new FormControl(''),
      designationId: new FormControl(''),
      isEmployeeAllowed: new FormControl(''),
      isEmployeeMaleAllowed: new FormControl(''),
      isEmployeeFemaleAllowed: new FormControl(''),
      isEmployeeTransAllowed: new FormControl(''),
      attendanceEnabled: new FormControl('')
    })
    this.getData();
    this.getPosition();
    this.getDep();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'departmentId',
      textField: 'departmentName',
      selectAllText: 'select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 3,

    };
  }
  employeeGenderControl(event, type) {

    if (type == 'male') {
      event.checked == true
        ? this.ruleengineForm.get("isEmployeeMaleAllowed").setValue(1)
        : this.ruleengineForm.get("isEmployeeMaleAllowed").setValue(0);
    }

    if (type == 'female') {
      event.checked == true
        ? this.ruleengineForm.get("isEmployeeFemaleAllowed").setValue(1)
        : this.ruleengineForm.get("isEmployeeFemaleAllowed").setValue(0);
    }

    if (type == 'tran') {
      event.checked == true
        ? this.ruleengineForm.get("isEmployeeTransAllowed").setValue(1)
        : this.ruleengineForm.get("isEmployeeTransAllowed").setValue(0);
    }
    if (event.checked == true) {
      this.empGen.push(this.ruleengineForm.value.employeeGentermale);
    } else {
      this.empGen = this.empGen.filter((x) => x! = this.ruleengineForm.value.employeeGentermale);
    }
  }
  employeeAllowControl(event) {
    event.checked == true
      ? this.ruleengineForm.get("isEmployeeAllowed").setValue(1)
      : this.ruleengineForm.get("isEmployeeAllowed").setValue(0);
    if (event.checked == true) {
      this.allowed.push(this.ruleengineForm.value.isEmployeeAllow);
      this.empGen = this.empGen.filter((x) => x! = 0)
    } else if (event.checked == false) {
      this.allowed.splice(this.ruleengineForm.value.isEmployeeAllow, 1);
    }
  }
  employeeattenanceControl(event) {
    event.checked == true
      ? this.ruleengineForm.get("attendanceEnabled").setValue(1)
      : this.ruleengineForm.get("attendanceEnabled").setValue(0);
  }
  getDep() {
    var obj = {
      'customerId': this.customerId
    }
    this.getService.getDepartment(obj).subscribe((data) => {
      this.departments = data.responseModel;
    })
  }
  getData() {
    var obj = {
      'customerId': this.customerId,
      'districtId': this.districtId
    }
    this.getService.getLayout(obj).subscribe((data) => {
      this.dataSource = data.responseModel;
    })
  }
  getPosition() {
    var obj = {
      'customerId': this.customerId
    }
    this.getService.getPosition(obj).subscribe((data) => {
      this.Position = data.responseModel;
    })
  }
  onItemSelect(event: any, department: Department) {
    this.departmentId = (department.departmentId)
    this.MultipleDepartment.push(department.departmentId);
    if (event.source.selected == true) {
      this.departmentModel = {
        'departmentId': this.departmentId,
        'designationId': this.designationId
      }
      this.departmentIds.push(this.departmentModel)
    }
    else {
      this.departmentIds.splice(this.departmentIds.indexOf(this.departmentId), 1)
    }
    var obj = {
      'departmentId': this.MultipleDepartment,
      'customerId': this.customerId,
      'districtId': this.districtId
    }
    this.getService.getposition(obj).subscribe((data) => {
      this.positions = data.responseModel;
    })
  }
  onPositionChange(event: any, position: Positions) {
    this.positionDepartment = position.departmentId
    this.designations = position.designationId

    this.departmentIds.map(element => {
      let data;
      if (event.source.selected == true) {
        if (element.departmentId == position.departmentId) {
          if (element.designationId == 0) {
            data = [];
          }
          else {
            data = element.designationId;
          }
          data.push(position.designationId);
          element.designationId = data;
        }
      }else if(element.departmentId==position.departmentId){
        element.designationId.splice(element.designationId.indexOf(position.designationId), 1)
      }
      console.log(this.departmentIds)
    });
  }
  save(post) {
    this.submitButton.disabled = true;
    post.departmentModel = this.departmentIds;
    post.customerId = this.customerId;
    post.districtId = this.districtId;
    this.getService.CreateRule(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusMessage == 'Success') {
        Swal.fire({
          icon: "success",
          title: " Layout-Rule Created  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Layout-Rule Create Failed",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
    });
  }
  discard() {
    this.dialogRef.close()
  }
}
