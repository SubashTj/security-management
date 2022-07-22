import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/service/api.service';
import { Account } from '../Model/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public recordAddedSubject = new BehaviorSubject<Account[]>([{}] as Account[]);
  public recordUpdatedSubject = new BehaviorSubject<Account[]>([{}] as Account[]);
  constructor(private apiService: ApiService) { }
  getRecordAddedSub(): Observable<Account[]> {
    return this.recordAddedSubject.asObservable();
  }
  getRecordUpdatedSub(): Observable<Account[]> {
    return this.recordUpdatedSubject.asObservable();
  }
  getAccount(obj): Observable<Account> {
    return this.apiService.getdep(`account-type/get-expense`, obj).pipe(map(Account => {
      return Account;
    }));
  }
  getAccounts(obj): Observable<Account> {
    return this.apiService.getdep(`account-type/get-all`, obj).pipe(map(Account => {
      return Account;
    }));
  }
  getexpesne(obj): Observable<Account> {
    return this.apiService.getdep(`extense-type/get-all`, obj).pipe(map(Account => {
      return Account;
    }));
  }
  create(department): Observable<Account> {
    return this.apiService.post(`account-type/create`, department).pipe(map(response => (response)));
  }
  update(post) {
    return this.apiService.update(`account-type/update`, post).pipe(map(response => (response)));
  }
  Delete(obj) {
    return this.apiService.deleteDep(`account-type/delete`, obj).pipe(map(response => (response)));
  }
  status(obj) {
    return this.apiService.update(`account-type/update-status`, obj).pipe(map(response => (response)));
  }
}
