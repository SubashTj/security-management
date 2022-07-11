import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { AppLoaderService } from 'src/app/core/service/app-loader.service';
import { ConfigService } from 'src/app/core/service/congif.service';
import { NavigationService } from 'src/app/core/service/navigation.service';
import { PermissionService } from 'src/app/core/service/permission.service';
import { ToastService } from 'src/app/core/service/toaster.service';
import { UserService } from 'src/app/core/service/user.service';
import { User } from 'src/app/core/user/user.model';

@Component({
  selector: 'app-login-otp',
  templateUrl: './login-otp.component.html',
  styleUrls: ['./login-otp.component.scss']
})
export class LoginOtpComponent implements OnInit {
  @ViewChild(MatButton) submitButton: MatButton;
  loginUser: User = new User();
  loginForm: FormGroup;
  submitted = false;
  data: any;
  constructor(private configService:ConfigService,private fb: FormBuilder,private router:Router,private navSer:NavigationService,private loader: AppLoaderService,private permSer: PermissionService,private sessionService:UserService, private toaster: ToastService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      mobileNumber : new FormControl('', [Validators.required,Validators.pattern('^[6,7,8,9]{1}[0-9]{9}$')]),
      otp : new FormControl('', [Validators.required,Validators.pattern('^[0-9]{6}$')]),

    })
  }

  onlyNumber(event) {
    const keyCode = event.keyCode;
    const excludedKeys = [8, 37, 39, 46];
    if (!((keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      (excludedKeys.includes(keyCode)))) {
      event.preventDefault();
    }
  }
  verify() {
    this.submitted = true;
    let otp = this.loginForm.value.otp;
    let mobileNumber= this.loginForm.value.mobileNumber;
  let  obj={
'otp':otp,
'mobileNumber':mobileNumber
    }

    this.sessionService.verifyOtp(obj).subscribe((res: any) => {
      this.data = res;
      if(this.data.statusMessage == 'Login Successful'){
        this.sessionService.setAuth(this.data.responseModel);
        localStorage.setItem('ISOTPVERIFIED', 'true');
        this.configService.init();
        this.permSer.init();
        let authMenu = this.permSer.authMenu;
        this.navSer.publish(authMenu);
        this.toaster.present("Login Success");
        this.router.navigate([`dashboard`]);
       
      }
      else { 
        this.toaster.present('Incorrect OTP.');
        this.submitButton.disabled = false;
        this.loader.close();
      }
    });

  }
  sendotp() {
    this.loginUser.mobileNumber = this.loginForm.value.mobileNumber;
    this.sessionService.otpVerify(this.loginUser).subscribe((res: any) => {
      this.data = res;
      if(this.data.statusMessage == 'Login Success'){
        this.sessionService.setAuth(this.data.responseModel);
        localStorage.setItem('ISOTPVERIFIED', 'true');
        this.configService.init();
        this.permSer.init();
        let authMenu = this.permSer.authMenu;
        this.navSer.publish(authMenu);
        this.toaster.present("Login Success");
        this.router.navigate([`dashboard`]);
       
      } else {
        this.submitButton.disabled = false;
        this.toaster.present(this.data.message);
      }

    });

  }
  goto(){
    this.router.navigate(['/'])
  }
}
