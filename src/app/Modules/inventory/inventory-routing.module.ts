import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockInComponent } from './stock-in/stock-in.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockOutComponent } from './stock-out/stock-out.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'stock-list',
        component: StockListComponent,
        data: { title: 'List of Stock ', breadcrumb: 'Stock' }
      },
      {
        path: 'stock-in',
        component: StockInComponent,
        data: { title: 'List of Stock-Entry ', breadcrumb: 'Stock-Entry' }
      },
      {
        path: 'purchase',
        component: StockOutComponent,
        data: { title: 'List of Purchase ', breadcrumb: 'Purchase' }
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
