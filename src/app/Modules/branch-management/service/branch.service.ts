import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/service/api.service';
import { District } from '../Model/branch.model';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private apiService: ApiService) { }
  getDetail(obj): Observable<District> {
    let params = new HttpParams();
    return this.apiService.getlayout(`district/get-detail`, obj).pipe(map(response => {
      return response;
    }));
  }
  Create(model): Observable<District> {
    return this.apiService.posts(`district/add-detail`, model).pipe(map(response => (response)));
  }
  Delete(obj): Observable<District> {
    return this.apiService.delete(`district/delete-detail`, obj).pipe(map(response => (response)));
  }
  Update(post: District) {
    return this.apiService.Update(`district/update-detail`, post).pipe(map(response => (response)));
  }
  Status(obj): Observable<District> {
    return this.apiService.status(`district/disable-detail`, obj).pipe(map(response => (response)));
  }
}
