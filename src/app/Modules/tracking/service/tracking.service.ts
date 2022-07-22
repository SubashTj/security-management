import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  constructor(private apiService: ApiService,) { }

  getEmployeeMac(obj) {
    return this.apiService.get(`get-particular-employee`, obj);
  }
  getEmployeeTimeLineData(obj) {
    return this.apiService.deviceget(`get-timeline-tracking`, obj);
  }
}
