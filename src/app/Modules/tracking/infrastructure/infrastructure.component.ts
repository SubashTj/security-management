import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { TrackingService } from '../service/tracking.service';

@Component({
  selector: 'app-infrastructure',
  templateUrl: './infrastructure.component.html',
  styleUrls: ['./infrastructure.component.scss']
})
export class InfrastructureComponent implements OnInit {
  urlSafe: SafeResourceUrl;
  showFrame = false;
  url: string;
  mac: any;
  constructor(public sanitizer: DomSanitizer,private modelService:TrackingService) { }

  ngOnInit(): void {
    this.getInfrastructure()
  }
  getInfrastructure() {
    let hostDomain = window.location.hostname;
    let parts = hostDomain.split(".");
    let tenant = parts.length >= 3 ? (parts.includes("www") ? parts[1] : parts[0]) : "";
    tenant = "hospital";
    this.url = `${environment.infrastructureUrl}`;
    this.showFrame = true;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
}
