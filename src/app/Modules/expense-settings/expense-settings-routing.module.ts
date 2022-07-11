import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpenseTypeComponent } from './expense-type/expense-type.component';
import { TransactionTypeComponent } from './transaction-type/transaction-type.component';


const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'expense-type',
    component:ExpenseTypeComponent,
    data: { title: 'List of Expense-Type', breadcrumb: 'List' }
      },
      {
        path:'transaction-type',
    component:TransactionTypeComponent,
    data: { title: 'List of Transaction-Type', breadcrumb: 'List' }
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseSettingsRoutingModule { }
