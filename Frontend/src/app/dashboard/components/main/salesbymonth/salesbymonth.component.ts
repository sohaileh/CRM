import { SharedService } from 'src/app/shared/service/shared-service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-salesbymonth',
  templateUrl: './salesbymonth.component.html',
  styleUrls: ['./salesbymonth.component.scss']
})
export class SalesbymonthComponent implements OnInit {

  constructor(private sharedservice:SharedService) { }

  totalSales:any=[];


  ngOnInit(): void {

    this.totalSales=[{
      name:"Total sales",
      series:[{
        name:"jan",
        value:30
      },{name:"feb",value:40}]
    }

    ]
  }



}
