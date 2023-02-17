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

  constructor(private snackbar: MatSnackBar, private http: HttpClient,private router:Router) {}

  filterData(matTableDataSource: any) {
    matTableDataSource.filter=this.searchData.trim().toLowerCase();
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
    return  this.http.get<any>(`${this.serverUrl}purchaselist`)
  }
  unAuthorized(){
    this.router.navigateByUrl('/admin/login')
  }


}
