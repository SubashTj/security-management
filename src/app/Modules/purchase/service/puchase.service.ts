import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/service/api.service';
import { Purchase } from '../Model/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class PuchaseService {

  constructor(private apiService: ApiService) { }
  getdetail(obj): Observable<Purchase> {
    let params = new HttpParams();
    return this.apiService.getlayout(`purchase/get-all`, obj).pipe(map(response => {
      return response;
    }));
  }
  delete(obj): Observable<Purchase> {
    return this.apiService.delete(`purchase/delete`, obj).pipe(map(response => (response)));
  }
  purchasestatus(obj): Observable<Purchase> {
    return this.apiService.status(`purchase/disable`, obj).pipe(map(response => (response)));
  }
  create(model): Observable<Purchase> {
    return this.apiService.posts(`purchase/create`, model).pipe(map(response => (response)));
  }
  getPurchaseVendor(obj): Observable<Purchase> {
    let params = new HttpParams();
    return this.apiService.get(`inventory_vendor/get-all`, obj).pipe(map(response => (response)));
  }
  getPurchaseUnit(obj): Observable<Purchase> {
    let params = new HttpParams();
    return this.apiService.get(`unit-type/get-all`, obj).pipe(map(response => (response)));
  }
  getallVendor(obj): Observable<Purchase> {
    let params = new HttpParams();
    return this.apiService.get(`inventory_vendor/get-by-id`, obj).pipe(map(response => (response)));
  }
  getOne(obj) {
    return this.apiService.get(`purchase/get-by-id`, obj)
  }
  Upadte(formData): Observable<Purchase> {

    return this.apiService.postsemp(`purchase/edit`, formData).pipe(map(response => (response)));
  }
}
