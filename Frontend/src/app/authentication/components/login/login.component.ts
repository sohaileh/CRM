import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/service/shared-service';
import { AuthService } from '../../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private snackBar: MatSnackBar,
    private authservice: AuthService,
    private formBuilder: FormBuilder,
    private sharedService: SharedService
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

  public showPassword: boolean = false;

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  login() {
    if (!this.loginForm.invalid) {
      this.authservice.authAdmin(this.loginForm.value).subscribe(
        (res: any) => {
          localStorage.setItem('token', res.accessToken);
          this.sharedService.snackbarNotification(res.msg,"OK",{
          duration:3000,
          panelClass:['snackbar-success'],
          });
          this.authservice._router.navigateByUrl('/admin/dashboard');
        },
        (error) => {
          this.sharedService.snackbarNotification(error.error.msg,"Retry",{
            duration:3000,
            panelClass:['snackbar-fail']
          });
        }
      );
    }
  }
}
