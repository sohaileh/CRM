import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  isDashboardComponent=false;
  constructor(private mediaObserver:MediaObserver,private snackbar: MatSnackBar) { }
  isSmallDevice(){
    return this.mediaObserver.asObservable();
  }

  snackbarNotification(msg:any,action:any,config:any){
    this.snackbar.open(msg,action,config)

  }
}
