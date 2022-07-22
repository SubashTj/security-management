import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { NavigationService } from 'src/app/core/service/navigation.service';
import { PermissionService } from 'src/app/core/service/permission.service';
import { AppLoaderService } from 'src/app/core/service/app-loader.service';
import { SessionService } from '../service/session.service';
import { ToastService } from 'src/app/core/service/toaster.service';
import { ConfigService } from 'src/app/core/service/congif.service';
import { UserService } from 'src/app/core/service/user.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  @ViewChild(MatButton) submitButton: MatButton;
  data: any;
  signinForm: FormGroup;
  submitted = false;
  loginUser: any;
  email: string;
  password: string;
  constructor(private configService: ConfigService, private fb: FormBuilder, private router: Router, private navSer: NavigationService, private loader: AppLoaderService, private permSer: PermissionService, private sessionService: UserService, private toaster: ToastService,) { }

  ngOnInit(): void {
    this.signinForm = this.fb.group(
      {
        mail: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),

      }
    );
  }
  signin(post) {
    this.submitted = true;
    if (this.signinForm.invalid) {
      return;
    }
    this.loader.open();
    this.sessionService.signin(post).subscribe((data) => {
      this.data = data;
      console.log(this.data.responseModel)
      if (this.data.statusMessage == 'Login Success') {
        this.sessionService.setAuth(this.data.responseModel);
        localStorage.setItem('ISOTPVERIFIED', 'true');
        this.configService.init();
        this.permSer.init();
        let authMenu = this.permSer.authMenu;
        this.navSer.publish(authMenu);
        this.toaster.present("Login Success");
        this.router.navigate([`dashboard`]);
        this.loader.close();
      }

      else if (this.data.statusMessage == 'Login Failed') {
        this.toaster.present("Email Or Password Incorrect");
      }

    })
  }
  goto() {
    this.router.navigate([`/forgot-password`]);
  }
}
