import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from '../../Model/category.model';
import { LayoutPosition } from '../../Model/layoutposition.model';
import { LayoutService } from '../../service/layout.service';
import Swal from 'sweetalert2';
import { ConfigService } from 'src/app/core/service/congif.service';
import { RuleEngine } from '../../Model/ruleengine.model';
import { Positions } from 'src/app/modules/job-position/Model/positions.model';
import { Department } from 'src/app/modules/department/Department-Model/department.model';
@Component({
  selector: 'app-rule-update',
  templateUrl: './rule-update.component.html',
  styleUrls: ['./rule-update.component.scss']
})
export class RuleUpdateComponent implements OnInit {
  @ViewChild(MatButton) submitButton: MatButton;
  formData = {}
  ruleengineForm: FormGroup;
  empGen: any = [];
  dataSource: Category[];
  category: RuleEngine = new RuleEngine();
  Position: LayoutPosition[];
  allowed: any = [];
  departments: any;
  positions: Positions[];
  customerId: string;
  districtId: string;
  department = [];
  position = [];
  allSelected = false;
  select: any;
  departmentIds: any = [];
  selectedDepartmentArray: any = []
  positionDepartment: any;
  designations: any;
  dropdownSettings = {};
  departmentId: any;
  departmentModel = {}
  MultipleDepartment: any = [];
  designationId = [];
  isEmployeeMaleAllowd: any
  isEmployeeFemaleAllowd: any
  isEmployeeTransAllowed: any
  isEmployeeAllowd: any
  designation: any = []
  Departments: any = [];
  formGroup: FormGroup
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<RuleUpdateComponent>, public dialog: MatDialog, private getService: LayoutService, private router: Router, private formBuilder: FormBuilder, private config: ConfigService) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }
  ngOnInit(): void {
    this.retriveForm(this.data.payload)
    this.getData();
    this.getDep();
    this.getPosition();
  }
  async retriveForm(item) {
    this.ruleengineForm = this.formBuilder.group({
      ruleId: [item.ruleId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      layoutId: [item.layoutId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      positionId: [item.positionId || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      attendanceEnabled: [item.attendanceEnabled || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      isEmployeeTransAllowed: [item.isEmployeeTransAllowed || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      isEmployeeMaleAllowed: [item.isEmployeeMaleAllowed || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      isEmployeeFemaleAllowed: [item.isEmployeeFemaleAllowed || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      isEmployeeAllowed: [item.isEmployeeAllowed || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      departmentModels: [item.departmentModels || '', [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      departmentId: [this.department, [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],
      designationId: [this.position, [Validators.required, Validators.pattern(/^\S$|^\S[\s\S]*\S$/)]],

    })
    await this.getposition();
    item.departmentModels.forEach(element => {
      this.department.push(element.departmentId)

      // this.ruleengineForm.get('departmentId').setValue(this.department);
    });

    item.departmentModels.forEach(element => {
      this.position.push(element.designationId)
    });


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
      this.allowed.push(this.ruleengineForm.value.isEmployeeAllowed);
      this.empGen = this.empGen.filter((x) => x! = 0)
    } else if (event.checked == false) {
      this.allowed.splice(this.ruleengineForm.value.isEmployeeAllowed, 1);
    }
  }
  employeeattenanceControl(event) {
    event.checked == true
      ? this.ruleengineForm.get("attendanceEnabled").setValue(1)
      : this.ruleengineForm.get("attendanceEnabled").setValue(0);

  }

  getposition() {
    var obj = {
      'departmentId': this.MultipleDepartment,
      'customerId': this.customerId,
      'districtId': this.districtId
    }
    this.getService.getposition(obj).subscribe((data) => {
      this.positions = data.responseModel;
    })
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
      'customerId': this.customerId,
      'districtId': this.districtId
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
    } else {
      this.departmentIds.splice(this.departmentIds.indexOf(this.departmentId), 1)
    }
    console.log(this.departmentIds)
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
    this.designations = position.designationId;
    this.departmentIds.map(element => {
      let data = [];
      if (event.source.selected == true) {
      if (element.departmentId == position.departmentId) {
        if (element.designationId == 0) {
          data = [];
        }
        else {
          data = element.designationId;
        }
        if (!data.includes(position.designationId)) {
          data.push(position.designationId);
        }
        element.designationId = data;
      }
    }else if(element.departmentId==position.departmentId){
      element.designationId.splice(element.designationId.indexOf(position.designationId), 1)
    }
    console.log(this.departmentIds)
    });
  }
  Update(post: any) {
    this.submitButton.disabled = true;
    post.departmentModel = this.departmentIds;
    post.customerId = this.customerId;
    post.districtId = this.districtId;
    this.getService.UpdateRule(post).subscribe((res: any) => {
      this.dialogRef.close();
      if (res.statusMessage == 'Success') {
        Swal.fire({
          icon: "success",
          title: " Layout-Rule Updated  Successfull",
          timer: 2500
        }).then(function () {
          window.location.reload();
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Layout-Rule Updated Failed",
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
