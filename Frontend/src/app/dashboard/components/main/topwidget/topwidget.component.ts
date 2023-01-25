import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topwidget',
  templateUrl: './topwidget.component.html',
  styleUrls: ['./topwidget.component.scss']
})
export class TopwidgetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
 
  topwidgetinfo=[
    {icon:"account_balance" ,name:'Month Sales', value:3000},
    {icon:"assignment",name:"Month Purchase", value:4000},
    {icon:"account_balance_wallet",name:"Total Sales",value:40000},
    {icon:"add_shopping_cart",name:"Total Purchase", value:30000}
  ]
}
