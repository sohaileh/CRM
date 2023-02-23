import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/service/shared-service';
import { AuthService } from '../../service/auth.service';
import { AlertService } from 'src/app/alert/alert.service';
import { LoaderService } from 'src/app/loader/service/loader.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private authservice: AuthService,
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private alertService:AlertService,
    public loaderService: LoaderService
  ) {
    localStorage.clear();
    this.sharedService.isDashboardComponent = false;
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', Validators.email],
        password: [''],
      },
      Validators.required
    );

  }


   showPassword: boolean = false;

   togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
 login() {
    if (!this.loginForm.invalid) {
      this.authservice.authAdmin(this.loginForm.value).subscribe(
        (res: any) => {
          localStorage.setItem('token', res.accessToken);
          this.alertService.showSuccess(res.message,'Success')
          this.authservice._router.navigateByUrl('/admin/dashboard');
        }
      );
    }
  }
}
