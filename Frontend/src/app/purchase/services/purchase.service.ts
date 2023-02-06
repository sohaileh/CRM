import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  serverUrl=environment.serverUrl;
  constructor(private http:HttpClient) { }

  addPurchaseDetails(data:any){
    return this.http.post<any>(`${this.serverUrl}purchase/addvehicle`,data)
   //console.log(data);
  }

  viewPurchaseDetails(){
    return  this.http.get<any>(`${this.serverUrl}purchase/purchaselist`)
  }

  deletePurchase(carNo:any){
    return  this.http.delete<any>(`${this.serverUrl}purchase/deletepurchase:${carNo}`)
  }
}
