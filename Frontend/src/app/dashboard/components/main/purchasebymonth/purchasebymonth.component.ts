import { SharedService } from 'src/app/shared/service/shared-service';
import { DashboardService } from './../../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchasebymonth',
  templateUrl: './purchasebymonth.component.html',
  styleUrls: ['./purchasebymonth.component.scss']
})
export class PurchasebymonthComponent implements OnInit {

  constructor(private sharedservice:SharedService  ) { }
  totalPurchase:any=[]
  purchaseData:any=[]
  month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  ngOnInit(): void {
    this.sharedservice.viewPurchaseDetails().subscribe(res=>{
      this.purchaseData=res.data
      this.calculateTotalPurchase();
    })
  }

  calculateTotalPurchase(){
    let monthPurchase:any=[0,0,0,0,0,0,0,0,0,0,0,0]
    let graphData:any=[]

    for(let i=0;i<this.purchaseData.length;i++){
        let month=new Date(this.purchaseData[i].purchase_date).getMonth()
        let value=this.purchaseData[i].totalAmount;
        monthPurchase[month]+=value
    }

    for(let i=0;i<monthPurchase.length;i++){
      let str={name:this.month[i],value:monthPurchase[i]}
      graphData.push(str)
    }

    this.totalPurchase=[{
      name:"Total Purchase",
      series:graphData
    }]
  }
}
