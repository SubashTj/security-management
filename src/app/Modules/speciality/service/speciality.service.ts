import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/service/api.service';
import { Speciality } from '../Model/speciality.model';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {
  public recordAddedSubject = new BehaviorSubject<Speciality[]>([{}] as Speciality[]);
  constructor(private apiService: ApiService) { }
  getSpeciality(obj): Observable<Speciality> {
    let params = new HttpParams();
    return this.apiService.getspec(`get-speciality`, obj).pipe(map(Speciality => {
      return Speciality;
    }));
  }
  create(post) {
    return this.apiService.postspec(`set-speciality`, post).pipe(map(response => (response)));
  }
  getDepartment(obj) {
    let params = new HttpParams();
    return this.apiService.getdep(`get-department-dropdown`, obj).pipe(map(Department => {
      return Department;
    }));
  }
  update(post) {
    return this.apiService.updatespec(`update-speciality`, post).pipe(map(response => (response)));
  }
  Delete(obj) {
    return this.apiService.deletespec(`delete-speciality`, obj).pipe(map(response => (response)));
  }
  status(obj) {
    return this.apiService.updatespeci(`update-speciality-active-status`, obj).pipe(map(response => (response)));
  }
}
