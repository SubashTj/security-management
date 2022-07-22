import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/service/api.service';
import { Vendors } from '../Model/vendor.model';

@Injectable({
  providedIn: 'root'
})
export class VendorsService {

  constructor(private apiService: ApiService) { }

  getallVendor(obj): Observable<Vendors> {
    let params = new HttpParams();
    return this.apiService.get(`inventory_vendor/get-by-id`, obj).pipe(map(response => (response)));
  }
  getPurchaseVendor(obj): Observable<Vendors> {
    let params = new HttpParams();
    return this.apiService.get(`inventory_vendor/get-all`, obj).pipe(map(response => (response)));
  }
  getalldata(obj): Observable<Vendors> {
    let params = new HttpParams();
    return this.apiService.get(`inventory_vendor/get-all`, obj).pipe(map(response => (response)));
  }
  vendorcreate(model): Observable<Vendors> {
    return this.apiService.posts(`inventory_vendor/create`, model).pipe(map(response => (response)));
  }
  Update(post: Vendors) {
    return this.apiService.Update(`inventory_vendor/update`, post).pipe(map(response => (response)));
  }
  status(obj): Observable<Vendors> {
    return this.apiService.status(`inventory_vendor/disable`, obj).pipe(map(response => (response)));
  }
  vendordelete(obj): Observable<Vendors> {
    return this.apiService.delete(`inventory_vendor/delete`, obj).pipe(map(response => (response)));
  }
}
