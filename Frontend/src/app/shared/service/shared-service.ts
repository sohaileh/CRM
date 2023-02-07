import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  constructor(private snackbar: MatSnackBar, private http: HttpClient) {}

  filterData(matTableDataSource: any) {
    matTableDataSource.filter = this.searchData.trim().toLowerCase();
  }
  clearSearch(matTableDataSource: any) {
    this.searchData = "";
    this.filterData(matTableDataSource);
  }
  snackbarNotification(msg: any, action: any, config: any) {
    this.snackbar.open(msg, action, config);
  }
  getSalesList() {
   return this.http.get(`${this.serverUrl}getsales`);
  }

  viewPurchaseDetails(){
    return  this.http.get<any>(`${this.serverUrl}purchase/purchaselist`)
  }
}
