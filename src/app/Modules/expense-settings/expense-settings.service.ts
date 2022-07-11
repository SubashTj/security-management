import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/service/api.service';
import { ExpenseType } from './Model/expense-type.model';
import { TransactionType } from './Model/transaction-type.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseSettingsService {
  public recordAddedSubject = new BehaviorSubject<ExpenseType[]>([{}] as ExpenseType[]);
  public recordUpdatedSubject = new BehaviorSubject<ExpenseType[]>([{}] as ExpenseType[]);
  constructor(private apiService : ApiService) { }
  getRecordAddedSub(): Observable<ExpenseType[]> {
    return this.recordAddedSubject.asObservable();
  } 
 getRecordUpdatedSub(): Observable<ExpenseType[]> {
    return this.recordUpdatedSubject.asObservable();
  }
  getExpenseType(obj): Observable<ExpenseType> {
    return this.apiService.getdep(`extense-type/get-expense`, obj).pipe(map(ExpenseType => {
      return ExpenseType;
  }));
}
create(expense) : Observable<ExpenseType>{
  return this.apiService.post(`extense-type/create`, expense).pipe(map(response => (response)));
}
update(post){
  return this.apiService.update(`extense-type/update`, post).pipe(map(response => (response)));
}
Delete(obj){
  return this.apiService.deleteDep(`extense-type/delete`, obj).pipe(map(response => (response)));
}
status(obj){
  return this.apiService.update(`extense-type/update-status`, obj).pipe(map(response => (response)));
}
getTransactionType(obj): Observable<TransactionType> {
  return this.apiService.getdep(`transaction/get-all-detail`, obj).pipe(map(TransactionType => {
    return TransactionType;
}));
}
Create(transaction) : Observable<TransactionType>{
return this.apiService.post(`employee/set-department`, transaction).pipe(map(response => (response)));
}
Update(post){
return this.apiService.update(`employee/update-department`, post).pipe(map(response => (response)));
}
delete(obj){
return this.apiService.deleteDep(`employee/delete-department`, obj).pipe(map(response => (response)));
}
Status(obj){
return this.apiService.update(`employee/update-department-active-status`, obj).pipe(map(response => (response)));
}
}
