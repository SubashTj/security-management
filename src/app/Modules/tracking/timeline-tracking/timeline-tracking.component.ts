import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ConfigService } from 'src/app/core/service/congif.service';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/helpers/format-datepicker';
import { AppServerDatePipe } from 'src/app/shared/pipes/app-config.pipe';
import { environment } from 'src/environments/environment';
import { TrackingService } from '../service/tracking.service';
import { TimelineItem } from "ngx-vertical-timeline";
@Component({
  selector: 'app-timeline-tracking',
  templateUrl: './timeline-tracking.component.html',
  styleUrls: ['./timeline-tracking.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    AppServerDatePipe,
  ],
})
export class TimelineTrackingComponent implements OnInit {
  events = [];
  urlSafe: SafeResourceUrl;
  url: string;
  mac: any;
  items: TimelineItem[] = [];
  ShowFields:boolean=false
  emp_code :string
  topicName: string;
  employee: any;
  employeeId: any;
  timelineDatas: any = [];
  category: string = '';
  choosedDate: string = '';
  basicForm: FormGroup;
  addParameter: any;
  customerId: string;
  districtId: string;
  layoutCategoryName: any;
  layoutPositionName: any;
  inTimestamp: any;
  outTimestamp: any;
  timeDifference: any;
  constructor( private config:ConfigService,   public sanitizer: DomSanitizer,private severdatePipe: AppServerDatePipe,private modelService:TrackingService,fb: FormBuilder) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
   }

  ngOnInit(): void {
    // this.getLiveTrackingData()
    this.form();
  }
  form() {
    this.basicForm = new FormGroup({
      type: new FormControl(''),
      thisDate: new FormControl(''),
      employeeId: new FormControl(''),
      start_date: new FormControl(''),
      end_date: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
    })
  }
  get control() {
    return this.basicForm.controls
  }
  getFormatDate(date) {
    return this.severdatePipe.transform(date)
  }
  getEmployeeByEmpCode(category) {
    let obj = {
      'employeeId': this.employeeId,
      'customerId': this.customerId,
      'districtId': this.districtId
    }
        this.modelService.getEmployeeMac(obj).subscribe((res) => {
this.mac=res.responseModel?.employeeId
          this.ShowFields=true
        });
      
    }
    getTimeLineTracking(){
      var date = this.getFormatDate(this.choosedDate);
      let obj = {
              
        "thisDate":date,
        'employeeId':this.mac
      };
  
      this.modelService.getEmployeeTimeLineData(obj).subscribe((data) => {
        this.timelineDatas = data.responseModel;
this.timelineDatas.array.forEach(element => {
  this.events.push(element)
});
      })
    }
  }

  
