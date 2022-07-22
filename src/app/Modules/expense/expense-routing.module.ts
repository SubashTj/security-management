import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpenseListComponent } from './expense-list/expense-list.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'expense-list',
        component: ExpenseListComponent,
        data: { title: 'List of Expense', breadcrumb: 'List' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }
