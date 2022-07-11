import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/service/api.service';
import { Payment } from '../Model/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentRemainderService {

  constructor(private apiService: ApiService) { }
  getPayment(obj): Observable<Payment> {
    return this.apiService.getdep(`payment-pending/get-payment-pending-details`, obj).pipe(map(License => {
      return License;
    }));
  }
  create(license): Observable<Payment> {
    return this.apiService.post(`payment-pending/set-payment-pending-details`, license).pipe(map(response => (response)));
  }
  update(post) {
    return this.apiService.update(`payment-pending/update-payment-pending-details`, post).pipe(map(response => (response)));
  }
  Delete(obj) {
    return this.apiService.deleteDep(`payment-pending/delete-payment-pending-details`, obj).pipe(map(response => (response)));
  }
  status(obj) {
    return this.apiService.update(`payment-pending/update-paymentpending-active-status`, obj).pipe(map(response => (response)));
  }
}
