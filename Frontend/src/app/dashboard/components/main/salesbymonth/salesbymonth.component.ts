import { DashboardService } from './../../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-salesbymonth',
  templateUrl: './salesbymonth.component.html',
  styleUrls: ['./salesbymonth.component.scss']
})
export class SalesbymonthComponent implements OnInit {

  constructor(private sales:DashboardService) { }

  netSales:any=[];
  
  ngOnInit(): void {
    this.netSales=this.sales.totalSales();
    
  }

  

 
  
}
