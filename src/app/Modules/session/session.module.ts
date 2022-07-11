import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SessionRoutingModule } from './session-routing.module';
import { SigninComponent } from './signin/signin.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetComponent } from './reset/reset.component';
import { LoginOtpComponent } from './login-otp/login-otp.component';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';
@NgModule({
  declarations: [SigninComponent, ForgotPasswordComponent, ResetComponent, LoginOtpComponent, ConfirmPasswordComponent],
  imports: [
    CommonModule,
    SessionRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    FlexLayoutModule,
    MatDividerModule
  
  ]
})
export class SessionModule { }
