import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/service/api.service';
import { InventoryType } from './Model/inventory-type.model';
import { Unit } from './Model/unittype.model';

@Injectable({
  providedIn: 'root'
})
export class InventorySettingService {
  public recordAddedSubject = new BehaviorSubject<InventoryType[]>([{}] as InventoryType[]);
  public recordUpdatedSubject = new BehaviorSubject<InventoryType[]>([{}] as InventoryType[]);
  constructor(private apiService: ApiService) { }
  getRecordAddedSub(): Observable<InventoryType[]> {
    return this.recordAddedSubject.asObservable();
  }
  getRecordUpdatedSub(): Observable<InventoryType[]> {
    return this.recordUpdatedSubject.asObservable();
  }
  getList(obj): Observable<InventoryType> {
    let params = new HttpParams();
    return this.apiService.get(`inventory-type/get-all`, obj).pipe(map(response => (response)));
  }
  Create(post): Observable<InventoryType> {
    return this.apiService.posts(`inventory-type/create`, post).pipe(map(response => (response)));
  }
  Update(post) {
    return this.apiService.Update(`inventory-type/update`, post).pipe(map(response => (response)));
  }
  Delete(obj) {
    return this.apiService.post(`inventory-type/delete`, obj).pipe(map(response => (response)));
  }
  status(obj) {
    return this.apiService.update(`inventory-type/update-status`, obj).pipe(map(response => (response)));
  }


  getUnit(obj): Observable<Unit> {
    let params = new HttpParams();
    return this.apiService.get(`unit-type/get-unit-types`, obj).pipe(map(response => (response)));
  }
  CreateUnit(post): Observable<Unit> {
    return this.apiService.posts(`unit-type/create`, post).pipe(map(response => (response)));
  }
  UpdateUnit(post: Unit) {
    return this.apiService.Update(`unit-type/update`, post).pipe(map(response => (response)));
  }
  DeleteUnit(obj) {
    return this.apiService.post(`unit-type/delete`, obj).pipe(map(response => (response)));
  }
  statusUnit(obj) {
    return this.apiService.update(`unit-type/disable`, obj).pipe(map(response => (response)));
  }
}
