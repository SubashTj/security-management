import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentListComponent } from './payment-list/payment-list.component';


const routes: Routes = [
  {
    path: '',
    children: [{
      path: 'payment-list',
      component: PaymentListComponent,
      data: { title: 'Payment-Remainder', breadcrumb: 'Payment-Remainder' }
    }]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRemainderRoutingModule { }
