import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/service/api.service';
import { Inventory } from '../Model/inventory.model';
import { Vendors } from '../Model/vendor.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private apiService:ApiService) { }
  getDetail(obj): Observable<Inventory> {
    let params = new HttpParams();
    return this.apiService.getlayout(`inventory-stock/get-all`, obj).pipe(map(response => {
      return response;
  }));
}
getInOut(obj): Observable<Inventory> {
  let params = new HttpParams();
  return this.apiService.getlayout(`stock-in-out/get-all`, obj).pipe(map(response => {
    return response;
}));
}
getInventorytype(obj): Observable<Inventory> {
  let params = new HttpParams();
  return this.apiService.getlayout(`inventory-type/inventory-type-dropdown`, obj).pipe(map(response => {
    return response;
}));
}
getUnittype(obj): Observable<Inventory> {
  let params = new HttpParams();
  return this.apiService.getlayout(`unit-type/get-all`, obj).pipe(map(response => {
    return response;
}));
}
Create(model) : Observable<Inventory>{
  return this.apiService.posts(`inventory-stock/create`, model).pipe(map(response =>(response)));
}
CreateEntry(model) : Observable<Inventory>{
  return this.apiService.posts(`stock-in-out/create`, model).pipe(map(response =>(response)));
}
Delete(obj):Observable<Inventory>{
  return this.apiService.delete(`inventory-stock/delete`, obj).pipe(map(response => (response)));
}
deleteStockEntry(obj):Observable<Inventory>{
  return this.apiService.delete(`stock-in-out/delete`, obj).pipe(map(response => (response)));
}
Update(post){
  return this.apiService.Update(`inventory-stock/update`, post).pipe(map(response => (response)));
}
UpdateEntry(post){
  return this.apiService.Update(`stock-in-out/update`, post).pipe(map(response => (response)));
}
Status(obj): Observable<Inventory>{
  return this.apiService.status(`inventory-stock/disable`, obj).pipe(map(response => (response)));
}
getStock(obj): Observable<any> {
  let params = new HttpParams();
  return this.apiService.getjob(`inventory-stock/get-stock-dropdown`, obj).pipe(map(any => {
    return any;
}));
}
getPosition(obj): Observable<any> {
  let params = new HttpParams();
  return this.apiService.getjob(`get-job-positions-dropdown`, obj).pipe(map(any => {
    return any;
}));
}
getVendor(obj): Observable<Vendors> {
  let params = new HttpParams();
  return this.apiService.getlayout(`branch/get-detail`, obj).pipe(map(response => {
    return response;
}));
}
}
