import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authservice: AuthService) {
    localStorage.clear();
  }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  login() {
    if (!this.loginForm.invalid) {
      this.authservice.authAdmin(this.loginForm.value).subscribe((res: any) => {
        if (res.status == 201) {
          localStorage.setItem('token', res.accessToken);
          console.log('logged in');
          // this.authservice._router.navigateByUrl('/admin/dashboard');
        } else {
          alert(res.info);
        }
      });
    } else {
      alert('Enter email/password');
    }
  }
}
