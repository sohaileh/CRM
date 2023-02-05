import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from 'src/app/shared/service/shared-service';
import { PurchaseService } from '../../services/purchase.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  xsDevice = false;
  searchData = "";
  purchaseData = [
    {
      _id: 1,
      vehicle_no: "JK01A 1111",
      fullName: "Suhail Bhat",
      purchase_date: new Date(),
      purchase_amount: 100,
      balance_amount: 0
    },
    {
      _id: 2,
      vehicle_no: "JK01A 2222",
      fullName: "Suhail Ahmad",
      purchase_date: new Date(),
      purchase_amount: 200,
      balance_amount: 100
    }
  ];
  constructor(private sharedService: SharedService,private purchaseService:PurchaseService) { }
  purchaseList!: MatTableDataSource<any>;
  displayedColumns = ["sell_id", "vehicle_no", "seller_name", "purchase_date", "totalAmount", "balanceAmount", "actions"]
  ngOnInit(): void {
    this.purchaseService.viewPurchaseDetails().subscribe(res=>{
      if(res.status==200){
        this.purchaseList=new MatTableDataSource(res.data);
        console.log(res.data)
      }
      else{
        alert('Something went wrong')
      }
    })
   // this.purchaseList = new MatTableDataSource(this.purchaseData);
    this.sharedService.isSmallDevice().subscribe(result => {
      this.xsDevice = result[0].mqAlias === "xs" ? true : false;
    });
  }
  ngAfterViewInit() {
    if (this.xsDevice)
      this.purchaseList.paginator = this.paginator;
  }
  searchPurchase() {
    this.purchaseList.filter = this.searchData.trim().toLowerCase();
  }
  clearSearch() {
    this.searchData = "";
    this.searchPurchase();
  }
}
