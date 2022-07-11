import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/core/service/congif.service';
import { ToastService } from 'src/app/core/service/toaster.service';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss']
})
export class ConfirmPasswordComponent implements OnInit {

  restForm: FormGroup;
  loginUser: any;
  submitted = false;
  @ViewChild(MatButton) submitButton: MatButton;
  tokens: any;
  data: any;
  customerId: string;
  districtId: string;
  token: string;

  constructor(  
    private activateRoute:ActivatedRoute ,
    private config:ConfigService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private modelService:SessionService,
    private toaster: ToastService ) {
      this.config.init();
      this.customerId = config.customerId;
      this.districtId = config.districtId;
     }

  ngOnInit(): void {

    const password = new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]);
    const confirmPassword = new FormControl('',[Validators.required]);

    this.restForm = this.fb.group(
      {
        password: password,
        confirmPassword: confirmPassword
      }
    );
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.token = params.token;
        console.log(this.token);
      }
    );
  }
  Submit(post) {
    this.submitted = false;
let obj={
  'token':this.token,
  'password':post.password
}
console.log(obj)
    this.modelService.newPassword(obj).subscribe((res: any) => {
      this.data = res;
      if (this.data.keyword == 'success') {
        this.submitButton.disabled = false;
        this.toaster.present(this.data.message);
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
