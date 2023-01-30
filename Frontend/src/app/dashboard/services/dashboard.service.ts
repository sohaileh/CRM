import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() {

  }
   month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
   sales=[3000,4000,2000,4003,5456,5564,7898,2134,6789,2345,6754,3243]


  totalSales(){
    let value=[]
     for(let i=0;i<12;i++){
      let str={name:this.month[i] ,value:this.sales[i]}
      value.push(str);
     }
     let netSalesData=[{
      name:"test",
      series:value
     }]
     return netSalesData;
  }
}
