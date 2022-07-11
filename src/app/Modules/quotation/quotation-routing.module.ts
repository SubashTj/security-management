import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuotationCreateComponent } from './quotation-create/quotation-create.component';
import { QuotationListComponent } from './quotation-list/quotation-list.component';


const routes: Routes = [
  {
    path:'',
    children:[
      {
    path: 'quotation-list',
    component: QuotationListComponent,
    data: { title: 'List of Quotation', breadcrumb: 'Quotation-List' }
  },
  {
    path:'quotation-create',
    component:QuotationCreateComponent,
    data: { title: 'Create Quotation', breadcrumb: 'New' }
  },
]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotationRoutingModule { }
