import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';



const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'invoice-list',
        component: InvoiceListComponent,
        data: { title: 'List of Expense', breadcrumb: 'List' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceSettingsRoutingModule { }
