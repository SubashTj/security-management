import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/service/api.service';
import { Department } from '../Department-Model/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  public recordAddedSubject = new BehaviorSubject<Department[]>([{}] as Department[]);
  public recordUpdatedSubject = new BehaviorSubject<Department[]>([{}] as Department[]);
  constructor(private apiService: ApiService) { }
  getRecordAddedSub(): Observable<Department[]> {
    return this.recordAddedSubject.asObservable();
  }
  getRecordUpdatedSub(): Observable<Department[]> {
    return this.recordUpdatedSubject.asObservable();
  }
  getDepartment(obj): Observable<Department> {
    return this.apiService.getdep(`employee/get-department`, obj).pipe(map(Department => {
      return Department;
    }));
  }
  create(department): Observable<Department> {
    return this.apiService.post(`employee/set-department`, department).pipe(map(response => (response)));
  }
  update(post) {
    return this.apiService.update(`employee/update-department`, post).pipe(map(response => (response)));
  }
  Delete(obj) {
    return this.apiService.deleteDep(`employee/delete-department`, obj).pipe(map(response => (response)));
  }
  status(obj) {
    return this.apiService.update(`employee/update-department-active-status`, obj).pipe(map(response => (response)));
  }
}
