import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/core/service/congif.service';
import { ToastService } from 'src/app/core/service/toaster.service';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  restForm: FormGroup;
  loginUser: any;
  submitted = false;
  @ViewChild(MatButton) submitButton: MatButton;
  tokens: any;
  data: any;
  customerId: string;
  districtId: string;

  constructor(  
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
    const mail = new FormControl('',[Validators.required]);
    const newPassword = new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]);
    const confirmPassword = new FormControl('',[Validators.required]);

    this.restForm = this.fb.group(
      {
        mail:mail,
        newPassword: newPassword,
        confirmPassword: confirmPassword
      }
    );
  }
  Submit(post) {
    this.submitted = false;
    post.customerId=this.customerId;
    post.districtId=this.districtId;
    this.modelService.resetPassword(post).subscribe((res: any) => {
      this.data = res;
      if (this.data.keyword == 'success') {
    
        this.router.navigate([`/`]);
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
