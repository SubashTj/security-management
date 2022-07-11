import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/service/api.service';
import { Qualification } from '../Model/qualification.model';

@Injectable({
  providedIn: 'root'
})
export class QualificationService {
  public recordAddedSubject = new BehaviorSubject<Qualification[]>([{}] as Qualification[]);
  public recordUpdatedSubject = new BehaviorSubject<Qualification[]>([{}] as Qualification[]);
  constructor(private apiService: ApiService) { }
  getRecordAddedSub(): Observable<Qualification[]> {
    return this.recordAddedSubject.asObservable();
  } 
 getRecordUpdatedSub(): Observable<Qualification[]> {
    return this.recordUpdatedSubject.asObservable();
  }
  getQualification(obj): Observable<Qualification> {
    let params = new HttpParams();
    return this.apiService.getqual(`employee/get-qualifications`, obj).pipe(map(Positions => {
      return Positions;
  }));
}
create(obj) : Observable<Qualification>{

  return this.apiService.postqual(`employee/set-qualifications`, obj).pipe(map(response => (response)));
}
update(post){
  return this.apiService.updatequal(`employee/update-qualification`, post).pipe(map(response => (response)));
}
Delete(obj):Observable<Qualification>{
  return this.apiService.deletequal(`employee/delete-qualifications`, obj).pipe(map(response => (response)));
}
}
