import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryTypeComponent } from './inventory-type/inventory-type.component';
import { UnitTypeComponent } from './unit-type/unit-type.component';


const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'inventory-type',
        component:InventoryTypeComponent,
        data: { title: 'List of Inventory-Type', breadcrumb: 'Inveentory-Type' }
      },
      {
        path:'unit-type',
        component:UnitTypeComponent,
        data: { title: 'List of unit-Type', breadcrumb: 'unit-Type' }
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventorySettingRoutingModule { }
