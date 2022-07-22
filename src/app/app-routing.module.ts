import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/service/auth-guard.service';
import { AdminLayoutComponent } from './shared/shared-component/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/shared-component/layouts/auth-layout/auth-layout.component';


const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./Modules/session/session.module").then(
            (m) => m.SessionModule
          ),
        data: { title: "Hospital" },
      },

    ],
  },
  {
    path: "",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./modules/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
        data: { title: "Dashboard", breadcrumb: "Dashboard" },
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./modules/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
        data: { title: "Dashboard", breadcrumb: "Dashboard" },
      },
      {
        path: "employee",
        loadChildren: () =>
          import("./modules/employee/employee.module").then(
            (m) => m.EmployeeModule
          ),
        data: { title: "Employee", breadcrumb: "Employee" },
      },
      {
        path: "expense",
        loadChildren: () =>
          import("./modules/expense/expense.module").then(
            (m) => m.ExpenseModule
          ),
        data: { title: "Expense", breadcrumb: "Expense" },
      },
      {
        path: "account",
        loadChildren: () =>
          import("./modules/account/account.module").then(
            (m) => m.AccountModule
          ),
        data: { title: "Account", breadcrumb: "Account" },
      },
      {
        path: "expense-settings",
        loadChildren: () =>
          import("./modules/expense-settings/expense-settings.module").then(
            (m) => m.ExpenseSettingsModule
          ),
        data: { title: "Expense-Settings", breadcrumb: "Expense-Settings" },
      },
      {
        path: "",
        loadChildren: () =>
          import("./modules/invoice-settings/invoice-settings.module").then(
            (m) => m.InvoiceSettingsModule
          ),
        data: { title: "Invoice-Settings", breadcrumb: "Invoice-Settings" },
      },
      {
        path: "branch",
        loadChildren: () =>
          import("./modules/clients/clients.module").then(
            (m) => m.ClientsModule
          ),
        data: { title: "Branch", breadcrumb: "Branch" },
      },
      {
        path: "inventory",
        loadChildren: () =>
          import("./modules/inventory/inventory.module").then(
            (m) => m.InventoryModule
          ),
        data: { title: "Inventory", breadcrumb: "Inventory" },
      },
      {
        path: "vendors",
        loadChildren: () =>
          import("./modules/vendors/vendors.module").then(
            (m) => m.VendorsModule
          ),
        data: { title: "Vendors", breadcrumb: "Vendors" },
      },
      {
        path: "purchase",
        loadChildren: () =>
          import("./modules/purchase/purchase.module").then(
            (m) => m.PurchaseModule
          ),
        data: { title: "Purchase", breadcrumb: "Purchase" },
      },
      {
        path: "salary",
        loadChildren: () =>
          import("./modules/salary/salary.module").then(
            (m) => m.SalaryModule
          ),
        data: { title: "Salary", breadcrumb: "Salary" },
      },
      {
        path: "inventory-settings",
        loadChildren: () =>
          import("./modules/inventory-setting/inventory-setting.module").then(
            (m) => m.InventorySettingModule
          ),
        data: { title: "Inventory-Setting", breadcrumb: "Inventory-Setting" },
      },
      {
        path: "",
        loadChildren: () =>
          import("./modules/license-remainder/license-remainder.module").then(
            (m) => m.LicenseRemainderModule
          ),
        data: { title: "License-Remainder", breadcrumb: "License-Remainder" },
      },
      {
        path: "",
        loadChildren: () =>
          import("./modules/payment-remainder/payment-remainder.module").then(
            (m) => m.PaymentRemainderModule
          ),
        data: { title: "Payment-Remainder", breadcrumb: "Payment-Remainder" },
      },
      {
        path: "district",
        loadChildren: () =>
          import("./modules/branch-management/branch-management.module").then(
            (m) => m.BranchManagementModule
          ),
        data: { title: "District", breadcrumb: "District" },
      },
      {
        path: "department",
        loadChildren: () =>
          import("./modules/department/department.module").then(
            (m) => m.DepartmentModule
          ),
        data: { title: "Department", breadcrumb: "Department" },
      },
      {
        path: "job-position",
        loadChildren: () =>
          import("./modules/job-position/job-position.module").then(
            (m) => m.JobPositionModule
          ),
        data: { title: "Designation", breadcrumb: "Designation" },
      },
      {
        path: "qualification",
        loadChildren: () =>
          import("./modules/qualification/qualification.module").then(
            (m) => m.QualificationModule
          ),
        data: { title: "Qualification", breadcrumb: "Qualification" },
      },
      {
        path: "speciality",
        loadChildren: () =>
          import("./modules/speciality/speciality.module").then(
            (m) => m.SpecialityModule
          ),
        data: { title: "Speciality", breadcrumb: "Speciality" },
      },
      {
        path: "holiday-settings",
        loadChildren: () =>
          import("./modules/holiday-settings/holiday-settings.module").then(
            (m) => m.HolidaySettingsModule
          ),
        data: { title: "HolidaySettings", breadcrumb: "HolidaySettings" },
      },
      {
        path: "shift-time",
        loadChildren: () =>
          import("./modules/shift-time/shift-time.module").then(
            (m) => m.ShiftTimeModule
          ),
        data: { title: "Shift Time", breadcrumb: "Shift Time" },
      },
      {
        path: "attendance-settings",
        loadChildren: () =>
          import("./modules/attendance-settings/attendance-settings.module").then(
            (m) => m.AttendanceSettingsModule
          ),
        data: { title: "AttendanceSettings", breadcrumb: "AttendanceSettings" },
      },
      {
        path: "layout-settings",
        loadChildren: () =>
          import("./modules/layout-settings/layout-settings.module").then(
            (m) => m.LayoutSettingsModule
          ),
        data: { title: "LayoutSettings", breadcrumb: "LayoutSettings" },
      },
      {
        path: "reports",
        loadChildren: () =>
          import("./modules/reports/reports.module").then(
            (m) => m.ReportsModule
          ),
        data: { title: "Reports", breadcrumb: "Reports" },
      },
      {
        path: "quotation",
        loadChildren: () =>
          import("./modules/quotation/quotation.module").then(
            (m) => m.QuotationModule
          ),
        data: { title: "Quotation", breadcrumb: "Quotation" },
      },
      {
        path: "tracking",
        loadChildren: () =>
          import("./modules/tracking/tracking.module").then(
            (m) => m.TrackingModule
          ),
        data: { title: "Tracking", breadcrumb: "Tracking" },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
