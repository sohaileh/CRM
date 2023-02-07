import { SharedService } from 'src/app/shared/service/shared-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topwidget',
  templateUrl: './topwidget.component.html',
  styleUrls: ['./topwidget.component.scss']
})
export class TopwidgetComponent implements OnInit {
  purchaseData:any=[]

  constructor(private sharedservice:SharedService) { }

  ngOnInit(): void {
    this.sharedservice.viewPurchaseDetails().subscribe((res)=>{
      this.purchaseData=res.data;
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
    for(let i=0;i<this.purchaseData.length;i++){
      this.topwidgetinfo[3].value+=this.purchaseData[i].totalAmount;
    }
  }

  calculateMonthAmount(){
    let today=new Date().getMonth();
    for(let i=0;i<this.purchaseData.length;i++){
      let purchaseMonth=new Date(this.purchaseData[i].purchase_date).getMonth()
      if(today== purchaseMonth){
        this.topwidgetinfo[1].value+=this.purchaseData[i].totalAmount;
      }
    }
  }
}
