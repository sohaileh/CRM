import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastr:ToastrService) { }

  showSuccess(message:any, title:any){
    this.toastr.success(message,title,{timeOut:3000,closeButton:true})
}

showError(message:any, title:any){
    this.toastr.error(message, title,{timeOut:3000,closeButton:true})
}

showInfo(message:any, title:any){
  this.toastr.info(message, title,{timeOut:3000,closeButton:true})
}
}
