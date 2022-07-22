import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseCreateComponent } from './purchase-create/purchase-create.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { PurchaseUpdateComponent } from './purchase-update/purchase-update.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'purchase-list',
        component: PurchaseListComponent,
        data: { title: 'Purchase ', breadcrumb: 'List of Purchase ' }
      },
      {
        path: 'purchase-create',
        component: PurchaseCreateComponent,
        data: { title: 'Create Purchase', breadcrumb: 'Purchase' }
      },
      {
        path: 'purchase-update/:id',
        component: PurchaseUpdateComponent,
        data: { title: 'Upadte Purchase', breadcrumb: 'Upadte' }
      },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
