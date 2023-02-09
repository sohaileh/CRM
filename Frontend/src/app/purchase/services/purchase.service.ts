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
    return this.http.post<any>(`${this.serverUrl}addvehicle`,data)
   //console.log(data);
  }

  deletePurchase(carNo:any){
    return  this.http.delete<any>(`${this.serverUrl}deletepurchase/${carNo}`)
  }

  findPurchase(carno:any){
    return this.http.get<any>(`${this.serverUrl}findvehicle/${carno}`)
  }

  editPurchase(carNo:any,editedDetail:any){
    return  this.http.put<any>(`${this.serverUrl}editpurchase${carNo}`,editedDetail)
  }
}
