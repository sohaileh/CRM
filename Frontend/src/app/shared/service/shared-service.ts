import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  serverUrl = environment.serverUrl;
  isDashboardComponent = true;
  searchData = "";
  salesData:any=[];

  purchaseData = [{
    _id: 1,
    vehicle_no: "JK01A 2222",
    fullName: "Suhail Ahmad",
    purchase_date: new Date(),
    purchase_amount: 100,
    balance_amount: 10
  }, {
    _id: 2,
    vehicle_no: "JK01A 1111",
    fullName: "Suhail Bhat",
    purchase_date: new Date(),
    purchase_amount: 100,
    balance_amount: 10
  }
  ];
  constructor(private snackbar: MatSnackBar, private http: HttpClient, private router: Router) { }
  getSalesByFilter() {
    return this.http.get(`${this.serverUrl}getsalesbyfilter${this.searchData}`);
  }
  clearSearch() {
    this.searchData = "";
    this.router.navigate(["/admin/dashboard"]).then(()=>{
    return this.router.navigateByUrl("/admin/sales/saleslist");
    });
  }
  snackbarNotification(msg: any, action: any, config: any) {
    this.snackbar.open(msg, action, config);
  }
  getSalesList() {
    return this.http.get(`${this.serverUrl}getsales`);
  }

  viewPurchaseDetails() {
    return this.http.get<any>(`${this.serverUrl}purchaselist`)
  }
  unAuthorized() {
    this.router.navigateByUrl('/admin/login')
  }


  getPurchasesDropDown() {
    return this.http.get<any>(`${this.serverUrl}purchaselist${10}`);
  }
  getPurchasesDropDownByFilter(query: any) {
    return this.http.post<any>(`${this.serverUrl}purchaselistbyfilter`, { query });
  }
  getSalesByPagination(limit:number,skipdata:number){
    return this.http.post(`${this.serverUrl}getsalesbypagination${limit}`,{skipdata});
  }
  epoch(date:Date){
    return date.getTime();
  }
}
