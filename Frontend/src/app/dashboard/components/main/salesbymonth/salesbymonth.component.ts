import { DashboardService } from './../../../services/dashboard.service';
import { SharedService } from 'src/app/shared/service/shared-service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-salesbymonth',
  templateUrl: './salesbymonth.component.html',
  styleUrls: ['./salesbymonth.component.scss']
})
export class SalesbymonthComponent implements OnInit {

  constructor(private dashboradservice:DashboardService) { }

  totalSales:any=[];
   month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  value=[0,0,0,0,0,0,0,0,0,0,0,0]
  sales:any;

  ngOnInit(): void {
    this.dashboradservice.getTotalSalesByDate().subscribe((res)=>{
      this.sales=res.data
      this.calculateGraphData();
    })

  }

  calculateGraphData(){
    let sale:any=[]
    let value=[]
    this.sales.forEach((sale:any) => {
      const saleMonth=new Date(sale.sold_date).getMonth()
      this.value[saleMonth]+=1
    });
    this.month.forEach((month,index)=>{
      sale.push({name:month,value:this.value[index]})
    })
    this.totalSales=[{
      name:"Total Sales",
      series:sale
    }]
  }


  yAxisFormat(val : any) {
    if (val % 1 > 0)
      return "";

    return val ;
 }
}
