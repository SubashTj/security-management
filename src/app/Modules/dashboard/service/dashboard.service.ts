import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private apiService : ApiService) { }
  getList(){
    let params = new HttpParams();
    return this.apiService.get(`overview/get-present-absent-percentage-instaff`, ).pipe(map(Employee => {
      return Employee;
  }));
}
getData(obj){
  let params = new HttpParams();
  return this.apiService.Overview(`dashboard/get-details`, obj).pipe(map(Employee => {
    return Employee;
}));
}
getDatas(obj){
  let params = new HttpParams();
  return this.apiService.Overview(`dashboard/get-empl-details`, obj).pipe(map(Employee => {
    return Employee;
}));
}
getAttendanceList(){
  let params = new HttpParams();
  return this.apiService.get(`overview/get-present-percentage`)
}
getDailyAttendanceList(){
  let params = new HttpParams();
  return this.apiService.get(`overview/get_graph_overview`)
}
}
