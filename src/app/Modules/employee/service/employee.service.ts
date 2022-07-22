import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/service/api.service';
import { ShiftDetails } from '../../attendance-settings/Model/shift-details.model';
import { District } from '../../branch-management/Model/branch.model';
import { Department } from '../../department/Department-Model/department.model';
import { Positions } from '../../job-position/Model/positions.model';
import { Qualification } from '../../qualification/Model/qualification.model';
import { Speciality } from '../../speciality/Model/speciality.model';
import { BloodGroup } from '../Model/bloodgroup.model';
import { Country } from '../Model/country.model';
import { Employees } from '../Model/employees.model';
import { Leave } from '../Model/leave.model';
import { Nationality } from '../Model/nationality.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private apiService: ApiService) { }
  GetList(obj): Observable<Employees> {
    let params = new HttpParams(obj);
    return this.apiService.get(`employee/get-employee-id-dropdown`, obj).pipe(map(Employee => {
      return Employee;
    }));
  }
  getList(obj): Observable<Employees> {
    let params = new HttpParams();
    return this.apiService.get(`employee/get-employee-details`, obj).pipe(map(Employee => {
      return Employee;
    }));
  }
  getDetails(obj): Observable<ShiftDetails> {
    let params = new HttpParams();
    return this.apiService.getlayout(`employee/get-shift-details-dropdown`, obj).pipe(map(Category => {
      return Category;
    }));
  }
  save(formData): Observable<Employees> {
    // let actionUrl = (action == 'create') ? 'employee/create' : 'employee/update';
    return this.apiService.posts(`employee/add-employee-registration-details`, formData).pipe(map(response => (response)));
  }
  Update(post): Observable<Employees> {
    return this.apiService.posts(`employee/add-employee-registration-details`, post).pipe(map(response => (response)));
  }
  advanceSalary(post): Observable<Employees> {
    return this.apiService.posts(`advance/set-salary-advance`, post).pipe(map(response => (response)));
  }
  employeeClient(post): Observable<Employees> {
    return this.apiService.posts(`employee-client-assign/add-detail`, post).pipe(map(response => (response)));
  }
  getbranch(obj): Observable<District> {
    let params = new HttpParams();
    return this.apiService.get(`district/customer-getbyId-detail`, obj).pipe(map(District => {
      return District;
    }));
  }
  getClient(obj): Observable<District> {
    let params = new HttpParams();
    return this.apiService.get(`branch/get-all-detail`, obj).pipe(map(District => {
      return District;
    }));
  }
  getDepartment(obj): Observable<Department> {
    let params = new HttpParams();
    return this.apiService.getdep(`employee/get-department-dropdown`, obj).pipe(map(Department => {
      return Department;
    }));
  }
  getPosition(obj): Observable<Positions> {
    let params = new HttpParams();
    return this.apiService.getjob(`employee/get-job-positions-dropdown`, obj).pipe(map(Positions => {
      return Positions;
    }));
  }
  getQualification(obj): Observable<Qualification> {
    let params = new HttpParams();
    return this.apiService.getqual(`employee/get-qualification-dropdown`, obj).pipe(map(Positions => {
      return Positions;
    }));
  }
  getSpeciality(obj): Observable<Speciality> {
    let params = new HttpParams();
    return this.apiService.getspec(`employee/get-speciality-dropdown`, obj).pipe(map(Speciality => {
      return Speciality;
    }));
  }
  getNational(): Observable<Nationality> {
    let params = new HttpParams();
    return this.apiService.getnationl(`employee/get-nationality`, params).pipe(map(Nationality => {
      return Nationality;
    }));
  }
  getBlood(): Observable<BloodGroup> {
    let params = new HttpParams();
    return this.apiService.getblood(`employee/get-blood-group`, params).pipe(map(BloodGroup => {
      return BloodGroup;
    }));
  }
  getReligion(): Observable<BloodGroup> {
    let params = new HttpParams();
    return this.apiService.getreligion(`employee/get-religion`, params).pipe(map(BloodGroup => {
      return BloodGroup;
    }));
  }
  getCountry(): Observable<Country> {
    let params = new HttpParams();
    return this.apiService.getcountry(`employee/get-country`, params).pipe(map(Country => {
      return Country;
    }));
  }
  getState(obj): Observable<Country> {
    return this.apiService.getcountry(`employee/get-state`, obj).pipe(map(Country => {
      return Country;
    }));
  }
  getCity(obj): Observable<Country> {
    return this.apiService.getcountry(`employee/get-city`, obj).pipe(map(Country => {
      return Country;
    }));
  }
  getMac(): Observable<Employees> {
    let params = new HttpParams();
    return this.apiService.get(`employee/get-employee-mac`, params).pipe(map(Employee => {
      return Employee;
    }));
  }
  getLeave(obj): Observable<Leave> {
    let params = new HttpParams();
    return this.apiService.getreligion(`employee/get-leave-request`, obj).pipe(map(Leave => {
      return Leave;
    }));
  }
  // getOne(obj> {

  //   return this.apiService.get(`get-particular-employee`, params).pipe(map(response => (response)));
  // }
  getOne(obj) {
    return this.apiService.get(`employee/get-particular-employee`, obj)
  }
  Upadte(formData): Observable<Employees> {

    return this.apiService.postsemp(`employee/edit-employee-registration`, formData).pipe(map(response => (response)));
  }
  status(obj) {
    return this.apiService.statuss(`employee/update-employee-status-active`, obj)
  }
  statusLeave(obj) {
    return this.apiService.statuss(`employee/update-leave-approval-status`, obj)
  }
  delete(obj) {
    return this.apiService.delete(`employee/delete-employee-registration`, obj)
  }
  getDailyAtten(obj) {
    return this.apiService.getTimeReport(`employee/get-daily_based_attendance_report`, obj)
  }
  getMonthlyAtten(obj) {
    return this.apiService.getTimeReport(`employee/get_monthly_based_attendance_report`, obj)
  }
  getIndividualAtten(obj) {
    return this.apiService.getTimeReport(`get_individual_attendance_report`, obj)
  }
  getTimeDaily(obj) {
    return this.apiService.getIndividualTimeReport(`get-timeline-daily-report`, obj)
  }
  getTimeMonthly(obj) {
    return this.apiService.getMonthlyTimeReport(`get-timeline-monthly-report`, obj)
  }
  getTimeIndivitual(obj) {
    return this.apiService.getMonthlyTimeReport(`get-timeline-individual-report`, obj)
  }
  attendence(obj) {
    return this.apiService.get(`attendance/get-outemployee-attendance`, obj)
  }
  attendenceCreate(obj) {
    return this.apiService.ManualAttendance(`attendance/set-outemployee-attendance`, obj)
  }
  attendenceOffice(obj) {
    return this.apiService.get(`instaff/get-instaff-employees`, obj)
  }
  attendenceCreateOffice(obj) {
    return this.apiService.ManualAttendance(`instaff/set-instaff-attendance`, obj)
  }
}















