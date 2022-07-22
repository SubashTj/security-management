import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'account',
        component: AccountComponent,
        data: { title: 'List of Accounts', breadcrumb: 'List' }
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
