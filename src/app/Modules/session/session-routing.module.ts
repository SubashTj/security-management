import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerifyGuard } from 'src/app/core/service/verify-guard.service';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginOtpComponent } from './login-otp/login-otp.component';
import { ResetComponent } from './reset/reset.component';
import { SigninComponent } from './signin/signin.component';


const routes: Routes = [
  {
    path:'',
    component:SigninComponent
  },
  {
    path:'signin',
    component:SigninComponent,
    canActivate: [VerifyGuard],
  },
  {
    path:'login-otp',
    component:LoginOtpComponent
  },
  {
    path:'forgot-password',
    component:ForgotPasswordComponent
  },
  {
    path:'reset',
    component:ResetComponent
  },
  {
    path:'confirm-password',
    component:ConfirmPasswordComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionRoutingModule { }
