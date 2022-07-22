import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDetailsComponent } from './layout_category/list-details/list-details.component';
import { ListComponent } from './layout_position/list/list.component';
import { RuleListComponent } from './layout_ruleengine/rule-list/rule-list.component';
import { RuleEngine } from './Model/ruleengine.model';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'layout_category/list-detail',
        component: ListDetailsComponent,
        data: { title: 'List of Layout Category', breadcrumb: 'Layout Category / List' }
      },
      {
        path: 'layout_position/list',
        component: ListComponent,
        data: { title: 'List of Layout Position', breadcrumb: 'Layout Position / List' }
      },
      {
        path: 'layout_ruleengine/rule-list',
        component: RuleListComponent,
        data: { title: 'List of Layout Rule Engine', breadcrumb: 'Layout Rule Engine / List' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutSettingsRoutingModule { }
