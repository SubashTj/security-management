import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/service/api.service';
import { District } from '../branch-management/Model/branch.model';
import { Salary } from './Model/salary.model';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  public recordAddedSubject = new BehaviorSubject<Salary[]>([{}] as Salary[]);
  constructor(private apiService:ApiService) { }
  getSalary(obj): Observable<Salary> {
    let params = new HttpParams();
    return this.apiService.getqual(`get-qualifications`, obj).pipe(map(Positions => {
      return Positions;
  }));
}
getDepartment(obj){
  let params = new HttpParams();
  return this.apiService.getdep(`get-department-dropdown`, obj).pipe(map(Department => {
    return Department;
}));
}
getbranch(obj): Observable<District> {
  let params = new HttpParams();
  return this.apiService.get(`district/customer-getbyId-detail`, obj).pipe(map(District => {
    return District;
}));
}
create(obj) : Observable<Salary>{

  return this.apiService.postqual(`set-qualifications`, obj).pipe(map(response => (response)));
}
getemployee(obj): Observable<District> {
  let params = new HttpParams();
  return this.apiService.get(`employee/get-employee-ids`, obj).pipe(map(Employees => {
    return Employees;
}));
}
salary(obj) : Observable<Salary>{
  return this.apiService.post(`salary/get-monthly-salary`, obj).pipe(map(Salary => {
    return Salary;
  }));
}
salaryIndiviual(obj) : Observable<Salary>{
  return this.apiService.post(`salary/get-daily-salary`, obj).pipe(map(Salary => {
    return Salary;
  }));
}
update(post){
  return this.apiService.updatequal(`update-qualification`, post).pipe(map(response => (response)));
}
delete(obj):Observable<Salary>{
  return this.apiService.deletequal(`delete-qualifications`, obj).pipe(map(response => (response)));
}
status(post){
  return this.apiService.updatejob(`update-job-active-status`, post).pipe(map(response => (response)));
}
}
