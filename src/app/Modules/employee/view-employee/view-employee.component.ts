import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/core/service/congif.service';
import { environment } from 'src/environments/environment';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {
  employeeId: any;
  employeeDetails: any = [];
  customerId: string;
  districtId: string;
  urlSafe: SafeResourceUrl;
  url: string;
  constructor(public sanitizer: DomSanitizer, private config: ConfigService, private activateRoute: ActivatedRoute, private modelService: EmployeeService) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
    this.employeeId = this.activateRoute.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.getOne();
  }
  getOne() {
    let obj = {
      'employeeId': this.employeeId,
      'customerId': this.customerId,
      'districtId': this.districtId
    }
    this.modelService.getOne(obj).subscribe((data) => {
      if (data.statusMessage == "Success") {
        this.employeeDetails = data.responseModel;
        this.url = `${environment.apiUrl}${this.employeeDetails.userImage}`
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
      } else {

      }
    });
  }

}
