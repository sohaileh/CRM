import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  constructor(private authservice: AuthService, private formBuilder: FormBuilder) {
    localStorage.clear();
  }
ngOnInit(): void {
  this.loginForm=this.formBuilder.group({
    email:['',Validators.email,],
    password:['']
  },Validators.required)
}


  login() {
    if (!this.loginForm.invalid) {
      this.authservice.authAdmin(this.loginForm.value).subscribe((res: any) => {
        if (res.status == 201) {
          localStorage.setItem('token', res.accessToken);
          console.log('logged in');
          this.authservice._router.navigateByUrl('/admin/dashboard');
        } else {
          alert(res.info);
        }
      });
    } else {
      alert('Enter email/password');
    }
  }
}
