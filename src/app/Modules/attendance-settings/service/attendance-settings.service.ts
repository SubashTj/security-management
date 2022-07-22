import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/service/api.service';
import { Department } from '../../department/Department-Model/department.model';
import { Employees } from '../../employee/Model/employees.model';
import { Positions } from '../../job-position/Model/positions.model';
import { ShiftAssign } from '../Model/shift-assign.model';
import { ShiftDetails } from '../Model/shift-details.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceSettingsService {
  public recordAddedSubject = new BehaviorSubject<ShiftDetails[]>([{}] as ShiftDetails[]);
  public recordUpdatedSubject = new BehaviorSubject<ShiftDetails[]>([{}] as ShiftDetails[]);
  constructor(private apiService: ApiService) { }
  getRecordAddedSub(): Observable<ShiftDetails[]> {
    return this.recordAddedSubject.asObservable();
  }
  getRecordUpdatedSub(): Observable<ShiftDetails[]> {
    return this.recordUpdatedSubject.asObservable();
  }
  getDetail(obj): Observable<ShiftDetails> {
    let params = new HttpParams();
    return this.apiService.getlayout(`employee/get-shift-details`, obj).pipe(map(Category => {
      return Category;
    }));
  }
  getDetails(obj): Observable<ShiftDetails> {
    let params = new HttpParams();
    return this.apiService.getlayout(`employee/get-shift-details-dropdown`, obj).pipe(map(Category => {
      return Category;
    }));
  }
  Create(model): Observable<ShiftDetails> {
    return this.apiService.posts(`employee/set-shift-details`, model).pipe(map(response => (response)));
  }
  Delete(obj): Observable<ShiftDetails> {
    return this.apiService.delete(`employee/delete-shift_details`, obj).pipe(map(response => (response)));
  }
  Update(post: ShiftDetails) {
    return this.apiService.Update(`employee/update_shift_details`, post).pipe(map(response => (response)));
  }
  Status(obj): Observable<ShiftDetails> {
    return this.apiService.status(`employee/update-shift-active-status`, obj).pipe(map(response => (response)));
  }
  getAssign(obj): Observable<ShiftAssign> {
    let params = new HttpParams();
    return this.apiService.getlayout(`employee/get-shift-assign`, obj).pipe(map(Category => {
      return Category;
    }));
  }
  create(model): Observable<ShiftAssign> {
    return this.apiService.posts(`employee/set-shift-assign`, model).pipe(map(response => (response)));
  }
  delete(obj): Observable<ShiftAssign> {
    return this.apiService.delete(`employee/delete-shift-assign`, obj).pipe(map(response => (response)));
  }
  update(post: ShiftAssign) {
    return this.apiService.Update(`employee/update-shift-assign`, post).pipe(map(response => (response)));
  }

  getPosition(obj): Observable<Positions> {
    let params = new HttpParams();
    return this.apiService.getjob(`employee/get-job-positions-dropdown`, obj).pipe(map(Positions => {
      return Positions;
    }));
  }
  getList(obj): Observable<Employees> {
    let params = new HttpParams(obj);
    return this.apiService.get(`employee/get-employee-code-dropdown`, obj).pipe(map(Employee => {
      return Employee;
    }));
  }
  getDepartment(obj): Observable<Department> {
    let params = new HttpParams();
    return this.apiService.getdep(`employee/get-department-dropdown`, obj).pipe(map(Department => {
      return Department;
    }));
  }

  getTimeList(obj) {
    let params = new HttpParams(obj);
    return this.apiService.get(`employee/get-employee-code-dropdown`, obj)
  }
}




