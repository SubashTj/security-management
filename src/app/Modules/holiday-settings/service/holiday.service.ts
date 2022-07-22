import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/service/api.service';
import { Holiday } from '../Model/holiday-setting.model';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  public recordAddedSubject = new BehaviorSubject<Holiday[]>([{}] as Holiday[]);
  public recordUpdatedSubject = new BehaviorSubject<Holiday[]>([{}] as Holiday[]);
  constructor(private apiService: ApiService) { }
  getRecordAddedSub(): Observable<Holiday[]> {
    return this.recordAddedSubject.asObservable();
  }
  getRecordUpdatedSub(): Observable<Holiday[]> {
    return this.recordUpdatedSubject.asObservable();
  }
  getHoliday(obj): Observable<Holiday> {
    let params = new HttpParams();
    return this.apiService.getholiday(`employee/get-holiday`, obj).pipe(map(Holiday => {
      return Holiday;
    }));
  }
  create(obj): Observable<Holiday> {
    return this.apiService.posts(`employee/set-holiday`, obj).pipe(map(response => (response)));
  }
  update(obj) {
    return this.apiService.Update(`employee/update-holiday`, obj).pipe(map(response => (response)));
  }
  Delete(obj): Observable<Holiday> {
    return this.apiService.delete(`employee/delete-holiday`, obj).pipe(map(response => (response)));
  }
}
