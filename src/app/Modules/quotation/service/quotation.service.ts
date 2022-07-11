import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/service/api.service';
import { Department } from '../../department/Department-Model/department.model';
import { Positions } from '../../job-position/Model/positions.model';
import { Quotation } from '../Model/quotation.model';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  constructor(private apiService: ApiService) { }
  getDepartment(obj): Observable<Department> {
    let params = new HttpParams();
    return this.apiService.getdep(`employee/get-department-dropdown`, obj).pipe(map(Department => {
      return Department;
    }));
  }
  getPosition(obj): Observable<Positions> {
    let params = new HttpParams();
    return this.apiService.getjob(`employee/get-designation-details`, obj).pipe(map(Positions => {
      return Positions;
    }));
  }
  getQuotation(obj): Observable<Quotation> {
    let params = new HttpParams();
    return this.apiService.get(`qutation/get-quotation`, obj).pipe(map(Quotation => {
      return Quotation;
    }));
  }
  create(obj): Observable<Quotation> {
    return this.apiService.post(`qutation/set-quotation`, obj).pipe(map(Quotation => {
      return Quotation;
    }));
  }
}
