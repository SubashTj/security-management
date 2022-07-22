
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/service/api.service';
import { District } from '../branch-management/Model/branch.model';
import { Employees } from '../employee/Model/employees.model';
import { Clients } from './Model/clients.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private apiService: ApiService) { }
  getDetail(obj): Observable<Clients> {
    let params = new HttpParams();
    return this.apiService.getlayout(`branch/get-detail`, obj).pipe(map(response => {
      return response;
    }));
  }
  Create(model): Observable<Clients> {
    return this.apiService.posts(`branch/add-detail`, model).pipe(map(response => (response)));
  }
  Delete(obj): Observable<Clients> {
    return this.apiService.delete(`branch/delete-detail`, obj).pipe(map(response => (response)));
  }
  Update(post: Clients) {
    return this.apiService.Update(`branch/update-detail`, post).pipe(map(response => (response)));
  }
  employeeAssign(post: Clients) {
    return this.apiService.Updates(`employee-client-assign/set-employee-assign-to-clients`, post).pipe(map(response => (response)));
  }
  Status(obj): Observable<Clients> {
    return this.apiService.status(`branch/disable-detail`, obj).pipe(map(response => (response)));
  }
  getPosition(obj): Observable<any> {
    let params = new HttpParams();
    return this.apiService.getjob(`get-job-positions-dropdown`, obj).pipe(map(any => {
      return any;
    }));
  }
  getbranch(obj): Observable<District> {
    let params = new HttpParams();
    return this.apiService.get(`district/customer-getbyId-detail`, obj).pipe(map(Branch => {
      return Branch;
    }));
  }
  getList(obj) {
    return this.apiService.employeeGet(`employee/get-employee-id-dropdown`, obj)
  }
  getDepartment(obj) {
    let params = new HttpParams();
    return this.apiService.getdep(`employee/get-department-dropdown`, obj).pipe(map(Department => {
      return Department;
    }));
  }
}
