import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/core/service/congif.service';
import { NavigationService } from 'src/app/core/service/navigation.service';
import { PermissionService } from 'src/app/core/service/permission.service';
import { ToastService } from 'src/app/core/service/toaster.service';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild(MatButton) submitButton: MatButton;
  data: any;
  signinForm: FormGroup;
  submitted = false;
  loginUser: any;
  hide = false;
  email: string;
  password: string;
  customerId: string;
  districtId: string;
  constructor(private config: ConfigService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private modelService: SessionService,
    private toaster: ToastService) {
    this.config.init();
    this.customerId = config.customerId;
    this.districtId = config.districtId;
  }

  ngOnInit(): void {
    this.signinForm = this.fb.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
      }
    );
  }

  Submit(post) {
    let obj = {
      'email': post.email
    }
    this.submitted = false;
    this.modelService.confirmPassword(obj).subscribe((res: any) => {
      this.data = res;
      if (this.data.statusMessage == 'Success') {
        this.router.navigate([`confirm-password`]);
        this.submitButton.disabled = false;
        this.toaster.present(this.data.message);
      } else {
        this.submitButton.disabled = false;
        this.toaster.present(this.data.message);

      }

    });
  }
  goto() {
    this.router.navigate([`/`]);
  }
}
