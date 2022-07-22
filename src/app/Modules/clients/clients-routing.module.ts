import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ClientListComponent,
        data: { title: 'List of Branch', breadcrumb: 'List of Branch' }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
