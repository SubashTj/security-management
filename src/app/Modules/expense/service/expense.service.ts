import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/service/api.service';
import { District } from '../../branch-management/Model/branch.model';
import { Expense } from '../Model/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {


  public recordAddedSubject = new BehaviorSubject<Expense[]>([{}] as Expense[]);
  public recordUpdatedSubject = new BehaviorSubject<Expense[]>([{}] as Expense[]);
  constructor(private apiService: ApiService) { }
  getRecordAddedSub(): Observable<Expense[]> {
    return this.recordAddedSubject.asObservable();
  }
  getRecordUpdatedSub(): Observable<Expense[]> {
    return this.recordUpdatedSubject.asObservable();
  }
  getExpense(obj): Observable<Expense> {
    return this.apiService.getdep(`expense/get-expense`, obj).pipe(map(Expense => {
      return Expense;
    }));
  }
  getTransaction(): Observable<Expense> {
    return this.apiService.getdep(`transaction/get-all-detail`).pipe(map(Expense => {
      return Expense;
    }));
  }
  getSender(obj): Observable<Expense> {
    return this.apiService.getdep(`account-type/get-all`, obj).pipe(map(Expense => {
      return Expense;
    }));
  }
  getReceiver(obj): Observable<Expense> {
    return this.apiService.getdep(`account-type/get-all-for-dropdown`, obj).pipe(map(Expense => {
      return Expense;
    }));
  }
  getexpesne(obj): Observable<Expense> {
    return this.apiService.getdep(`extense-type/get-all`, obj).pipe(map(Expense => {
      return Expense;
    }));
  }
  create(department): Observable<Expense> {
    return this.apiService.post(`expense/create`, department).pipe(map(response => (response)));
  }
  update(post) {
    return this.apiService.update(`expense/update`, post).pipe(map(response => (response)));
  }
  Delete(obj) {
    return this.apiService.deleteDep(`expense/delete`, obj).pipe(map(response => (response)));
  }
  status(obj) {
    return this.apiService.update(`expense/update-status`, obj).pipe(map(response => (response)));
  }
  getbranch(obj): Observable<District> {
    let params = new HttpParams();
    return this.apiService.get(`district/customer-getbyId-detail`, obj).pipe(map(District => {
      return District;
    }));
  }
}
