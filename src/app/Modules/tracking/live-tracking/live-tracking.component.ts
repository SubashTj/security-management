import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { DomSanitizer} from "@angular/platform-browser";
import { TrackingService } from '../service/tracking.service';
@Component({
  selector: 'app-live-tracking',
  templateUrl: './live-tracking.component.html',
  styleUrls: ['./live-tracking.component.scss']
})
export class LiveTrackingComponent implements OnInit {
  urlSafe: SafeResourceUrl;
  showFrame = false;
  url: string;
  mac: any;
  
  emp_code :string
  topicName: string;
  employee: any;
  employeeId: any;
  constructor(   public sanitizer: DomSanitizer,private modelService:TrackingService) { }

  ngOnInit(): void {
    // this.getLiveTrackingData()
  }
  getLiveTrackingData(mac) {
    let hostDomain = window.location.hostname;
    let parts = hostDomain.split(".");
    let tenant = parts.length >= 3 ? (parts.includes("www") ? parts[1] : parts[0]) : "";
    tenant = "hospital";
    this.url = `${environment.liveTrackingUrl}?mac=${mac}`;
    this.showFrame = true;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
  getEmployeeByEmpCode(employeeId){
    let obj = {
      'employeeId': this.employeeId
    }
    this.modelService.getEmployeeMac(obj).subscribe((res) => {
      console.log(res);
      // if (res?.keyword == 'success') {
        this.topicName = res.responseModel.macAddress
        this.getLiveTrackingData(this.topicName)
      // } else {
        // this.toaster.present('Employee have no mac address')
      // }
    });
  }
}



