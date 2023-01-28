import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService} from 'src/app/sharedService/shared-service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  @ViewChild(MatPaginator)paginator!:MatPaginator;
  xsDevice=false;
  searchData="";
  purchaseData=[
    {
      _id:1,
      vehicle_no:"JK01A 1111",
      fullName:"Suhail Bhat",
      purchase_date:new Date(),
      purchase_amount:100,
      balance_amount:0
    },
    {
      _id:2,
      vehicle_no:"JK01A 2222",
      fullName:"Suhail Ahmad",
      purchase_date:new Date(),
      purchase_amount:200,
      balance_amount:100
    }
   ];
  constructor(private sharedService:SharedService) { }
  purchaseList!:MatTableDataSource<any>;
  displayedColumns=["sell_id","vehicle_no","fullName","purchase_date","purchase_amount","balance_amount","actions"]
  ngOnInit(): void {
    this.purchaseList=new MatTableDataSource(this.purchaseData);
    this.sharedService.isSmallDevice().subscribe(result => {
      this.xsDevice=result[0].mqAlias==="xs"?true:false;
      });
  }
  ngAfterViewInit(){
    if(this.xsDevice)
    this.purchaseList.paginator=this.paginator;
  }
  searchPurchase(){
    this.purchaseList.filter=this.searchData.trim().toLowerCase();
  }
  clearSearch(){
    this.searchData="";
    this.searchPurchase();
  }
}
