import { HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/service/api.service';
import { environment } from 'src/environments/environment';
import { District } from '../../branch-management/Model/branch.model';
import { Department } from '../../department/Department-Model/department.model';
import { Employees } from '../../employee/Model/employees.model';
import { Positions } from '../../job-position/Model/positions.model';
import { Salary } from '../../salary/Model/salary.model';
import { FileUpload } from '../Model/file.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private apiService: ApiService) { }
  empreport(obj): Observable<Employees> {
    let params = new HttpParams();
    return this.apiService.posts(`get-restricted-entry-report`, obj).pipe(map(Employee => {
      return Employee;
    }));
  }
  empassign(obj): Observable<Employees> {
    let params = new HttpParams();
    return this.apiService.getspec(`employee-client-assign/get-detail`, obj).pipe(map(Employee => {
      return Employee;
    }));
  }

  esiepfReport(obj): Observable<any> {
    let params = new HttpParams();
    return this.apiService.post(`report/get-report`, obj).pipe(map(any => {
      return any;
    }));
  }
  taxReport(obj): Observable<any> {
    let params = new HttpParams();
    return this.apiService.post(`tax/get-tax`, obj).pipe(map(any => {
      return any;
    }));
  }
  getDailyAtten(post) {
    let params = new HttpParams();
    return this.apiService.posts(`get-restricted-entry-report`, post).pipe(map(Employee => {
      return Employee;
    }));
  }
  getIndividualAtten(post) {
    let params = new HttpParams();
    return this.apiService.posts(`get-restricted-entry-report`, post).pipe(map(Employee => {
      return Employee;
    }));

  }
  getClient(obj): Observable<District> {
    let params = new HttpParams();
    return this.apiService.get(`branch/get-all-detail`, obj).pipe(map(Branch => {
      return Branch;
    }));
  }
  getDepartment(obj): Observable<Department> {
    let params = new HttpParams();
    return this.apiService.getdep(`employee/get-department-dropdown`, obj).pipe(map(Department => {
      return Department;
    }));
  }
  getFile(): Observable<FileUpload> {
    let params = new HttpParams();
    return this.apiService.getdep(`pdf/get-pdf-details`).pipe(map(FileUpload => {
      return FileUpload;
    }));
  }
  getPosition(obj): Observable<Positions> {
    let params = new HttpParams();
    return this.apiService.getjob(`employee/get-job-positions-dropdown`, obj).pipe(map(Positions => {
      return Positions;
    }));
  }
  getBranch(obj): Observable<any> {
    let params = new HttpParams();
    return this.apiService.getjob(`branch/get-all-detail`, obj).pipe(map(any => {
      return any;
    }));
  }
  getInvoice(obj) {
    return this.apiService.post(`invoice/get_invoice_report`, obj).pipe(map(Positions => {
      return Positions;
    }));
  }
  getList(obj): Observable<Employees> {
    let params = new HttpParams(obj);
    return this.apiService.get(`get-employee-code-dropdown`, obj).pipe(map(Employee => {
      return Employee;
    }));
  }
  getTrash(obj): Observable<Employees> {
    let params = new HttpParams(obj);
    return this.apiService.get(`trash/get-trash-details`, obj).pipe(map(Employee => {
      return Employee;
    }));
  }
  //
  getemployee(obj): Observable<District> {
    let params = new HttpParams();
    return this.apiService.get(`employee/get-employee-ids`, obj).pipe(map(Employees => {
      return Employees;
    }));
  }

  getbranch(obj): Observable<District> {
    let params = new HttpParams();
    return this.apiService.get(`district/customer-getbyId-detail`, obj).pipe(map(District => {
      return District;
    }));
  }
  salaryIndiviual(obj): Observable<Salary> {
    return this.apiService.post(`salary/get-daily-salary-response`, obj).pipe(map(Salary => {
      return Salary;
    }));
  }
  outIndiviual(obj): Observable<Salary> {
    return this.apiService.post(`attendance/get-outside-staff/salary-report/response/daily`, obj).pipe(map(Salary => {
      return Salary;
    }));
  }
  getLogIn(obj): Observable<any> {
    return this.apiService.post(`report/get-login`, obj).pipe(map(any => {
      return any;
    }));
  }
  advanceSalary(obj): Observable<any> {
    return this.apiService.post(`advance/get-salary-advance`, obj).pipe(map(any => {
      return any;
    }));
  }

  salaryIndiviualDownload(obj): Observable<Salary> {
    return this.apiService.post(`salary/get-daily-salary`, obj).pipe(map(Salary => {
      return Salary;
    }));
  }
  salary(obj): Observable<Salary> {
    return this.apiService.post(`salary/get-monthly-salary-response`, obj).pipe(map(Salary => {
      return Salary;
    }));
  }
  outSalary(obj): Observable<Salary> {
    return this.apiService.post(`attendance/get-outside-staff/salary-report/response/monthly`, obj).pipe(map(Salary => {
      return Salary;
    }));
  }
  downloadMonthly(obj){
    return this.apiService.post(`invoice/get-invoice-reports`, obj).pipe(map(any => {
      return any;
    }));
  }
  Delete(obj) {
    return this.apiService.deleteFile(`pdf/delete-pdf`, obj).pipe(map(response => (response)));
  }
  create(formData): Observable<FileUpload> {
    return this.apiService.fileUpload(`pdf/postpdf`, formData).pipe(map(response => (response)));
  }
  // downloadFile(obj) {
  //   return this.apiService.downloadMonthly(`salary/get-daily-salary`, obj).pipe(map(response => (response)));
  // }
  // downloadFileMonthly(obj) {
  //   return this.apiService.downloadMonthly(`salary/get-monthly-salary`, obj).pipe(map(response => (response)));
  // }
}
