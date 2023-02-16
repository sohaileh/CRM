import { SharedService } from 'src/app/shared/service/shared-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topwidget',
  templateUrl: './topwidget.component.html',
  styleUrls: ['./topwidget.component.scss']
})
export class TopwidgetComponent implements OnInit {
  purchaseData:any=[]
  salesData:any=[]
  constructor(private sharedservice:SharedService) { }

  ngOnInit(): void {
    this.sharedservice.viewPurchaseDetails().subscribe((res)=>{
      this.purchaseData=res;

    },(err)=>{

      this.sharedservice.unAuthorized()
    })

    this.sharedservice.getSalesList().subscribe((res)=>{
      this.salesData=res;
      console.log(res);

      this.calculateTotalAmount();
      this.calculateMonthAmount();
    })
  }

  topwidgetinfo=[
    {icon:"account_balance" ,name:'Month Sales', value:0},
    {icon:"assignment",name:"Month Purchase", value:0},
    {icon:"account_balance_wallet",name:"Total Sales",value:0},
    {icon:"add_shopping_cart",name:"Total Purchase", value:0}
  ]

  calculateTotalAmount(){
    this.purchaseData.data.forEach((ele:any) => {
      this.topwidgetinfo[3].value+=ele.totalAmount;
    });
    this.salesData.data.forEach((ele:any)=>{
      this.topwidgetinfo[2].value+=ele.sold_amount
    })
  }

  calculateMonthAmount(){
    let today=new Date().getMonth();
    this.purchaseData.data.forEach((ele:any)=>{
      let purchaseMonth=new Date(ele.purchase_date).getMonth()
      if(today==purchaseMonth){
        this.topwidgetinfo[1].value+=ele.totalAmount;
      }
    })
    console.log(this.salesData.data);

    this.salesData.data.forEach((ele:any)=>{
      let salesMonth=new Date(ele.sold_date).getMonth()
      if(today==salesMonth){
        this.topwidgetinfo[0].value+=ele.sold_amount;
      }
    })
  }
}
