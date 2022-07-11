import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/service/api.service';
import { Invoice } from '../Model/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceSettingsService {

  public recordAddedSubject = new BehaviorSubject<Invoice[]>([{}] as Invoice[]);
  public recordUpdatedSubject = new BehaviorSubject<Invoice[]>([{}] as Invoice[]);
  constructor(private apiService: ApiService) { }
  getRecordAddedSub(): Observable<Invoice[]> {
    return this.recordAddedSubject.asObservable();
  }
  getRecordUpdatedSub(): Observable<Invoice[]> {
    return this.recordUpdatedSubject.asObservable();
  }
  getInvoice(obj): Observable<Invoice> {
    return this.apiService.getdep(`invoice/get-all`, obj).pipe(map(Invoice => {
      return Invoice;
    }));
  }
  create(department): Observable<Invoice> {
    return this.apiService.post(`invoice/create`, department).pipe(map(response => (response)));
  }
  update(post) {
    return this.apiService.update(`invoice/update`, post).pipe(map(response => (response)));
  }
  Delete(obj) {
    return this.apiService.deleteDep(`invoice/delete`, obj).pipe(map(response => (response)));
  }
  status(obj) {
    return this.apiService.update(`expense/update-status`, obj).pipe(map(response => (response)));
  }

}
