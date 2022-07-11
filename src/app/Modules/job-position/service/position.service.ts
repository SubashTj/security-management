import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/service/api.service';
import { Positions } from '../Model/positions.model';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  public recordAddedSubject = new BehaviorSubject<Positions[]>([{}] as Positions[]);
  public recordUpdatedSubject = new BehaviorSubject<Positions[]>([{}] as Positions[]);
  constructor(private apiService: ApiService) { }
  getRecordAddedSub(): Observable<Positions[]> {
    return this.recordAddedSubject.asObservable();
  } 
 getRecordUpdatedSub(): Observable<Positions[]> {
    return this.recordUpdatedSubject.asObservable();
  }
  getPosition(obj): Observable<Positions> {
    let params = new HttpParams();
    return this.apiService.getjob(`employee/get-designation`, obj).pipe(map(Positions => {
      return Positions;
    }));
  }
  getDepartment(obj) {
    let params = new HttpParams();
    return this.apiService.getdep(`employee/get-department-dropdown`, obj).pipe(map(Department => {
      return Department;
    }));
  }
  create(post: Positions): Observable<Positions> {
    return this.apiService.postjob(`employee/set-job-positions`, post).pipe(map(response => (response)));
  }
  status(post) {
    return this.apiService.updatejob(`employee/update-job-active-status`, post).pipe(map(response => (response)));
  }
  Delete(obj) {
    return this.apiService.deleteJob(`employee/delete-job-positions`, obj).pipe(map(response => (response)));
  }
  update(obj) {
    return this.apiService.updatejob(`employee/update-job-positions`, obj).pipe(map(response => (response)));
  }
}
