import { DashboardService } from './../../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchasebymonth',
  templateUrl: './purchasebymonth.component.html',
  styleUrls: ['./purchasebymonth.component.scss']
})
export class PurchasebymonthComponent implements OnInit {

  constructor(private purchase:DashboardService) { }
  netPurchase:any=[]
  ngOnInit(): void {
    this.netPurchase=this.purchase.totalSales();
  }

}
