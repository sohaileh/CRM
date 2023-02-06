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
  constructor(public sharedService: SharedService,private purchaseService:PurchaseService) { }
  purchaseList!: MatTableDataSource<any>;
  displayedColumns = ["sell_id", "vehicle_no", "seller_name", "purchase_date", "totalAmount", "balanceAmount", "actions"]
  ngOnInit(): void {
    this.purchaseService.viewPurchaseDetails().subscribe(res=>{
      if(res){
        this.purchaseList=new MatTableDataSource(res.data);
      }
      else{
        alert('Something went wrong')
      }
    })
  }

  onPurchaseDelete(carNo:any){
    this.purchaseService.deletePurchase(carNo).subscribe((res)=>{
      if(res){
        alert("Vehicle "+carNo+" "+res.message)
      }else{
        alert(res.message)
      }
    })

   }
}
