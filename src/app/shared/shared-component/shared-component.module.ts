import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';
import { HeaderTopComponent } from './header-top/header-top.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule  } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { AppLoaderComponent } from './app-loader/app-loader.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CropComponent } from './crop/crop.component';
import { SidebarTopComponent } from './sidebar-top/sidebar-top.component';
import { HeaderSideComponent } from './header-side/header-side.component';
import { SidebarSideComponent } from './sidebar-side/sidebar-side.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SharedDirectivesModule } from '../directives/shared-directives.module';
@NgModule({
  declarations: [AdminLayoutComponent, AuthLayoutComponent, HeaderTopComponent, AppLoaderComponent, BreadcrumbComponent, CropComponent, SidebarTopComponent, HeaderSideComponent, SidebarSideComponent, SidenavComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    PerfectScrollbarModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatTooltipModule,
    MatSidenavModule,
    SharedDirectivesModule,
    MatToolbarModule

  ]
})
export class SharedComponentModule { }
