import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService, private route:Router){

  }
  canActivate(){
  if(this.authService.isloggedIn()){
    return true;
  }
  else{
    this.route.navigate(['admin/login'])
    return false
  }
  }

}
