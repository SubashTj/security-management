import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/service/api.service';
import { License } from '../Model/license.model';

@Injectable({
  providedIn: 'root'
})
export class LicenseRemainderService {

  constructor(private apiService: ApiService) { }
  getDepartment(obj): Observable<License> {
    return this.apiService.getdep(`license/get-license`, obj).pipe(map(License => {
      return License;
    }));
  }
  create(license): Observable<License> {
    return this.apiService.post(`license/set-license`, license).pipe(map(response => (response)));
  }
  update(post) {
    return this.apiService.update(`license/update-license`, post).pipe(map(response => (response)));
  }
  Delete(obj) {
    return this.apiService.deleteDep(`license/delete-license`, obj).pipe(map(response => (response)));
  }
  status(obj) {
    return this.apiService.update(`license/update-active-status`, obj).pipe(map(response => (response)));
  }
}
