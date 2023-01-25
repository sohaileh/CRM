import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnInit {

  constructor() { }
  salesList=[{
   _id:1,
    vehicle_no:"JK01A 1111",
    name:"Suhail Bhat",
    phone_no:1234567890,
    postal_code:191111,
    sold_date:Date.now(),
    sold_amount:1213,
    balance_amount:0
  },{
    _id:1,
     vehicle_no:"JK01A 1111",
     name:"Suhail Bhat",
     phone_no:1234567890,
     postal_code:191111,
     sold_date:Date.now(),
     sold_amount:1213,
     balance_amount:0
   }
];
  displayColumns=["_id","name","vehicle_no","phone_no","postal_code","sold_date","sold_amount","balance_amount","actions"];
  ngOnInit(): void {
  }

}
