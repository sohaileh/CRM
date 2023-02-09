import { Router } from '@angular/router';
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

  constructor(public sharedService: SharedService,private purchaseService:PurchaseService,private router:Router) { }
  purchaseList!: MatTableDataSource<any>;
  displayedColumns = ["vehicle_no", "seller_name", "purchase_date", "actions"]
  ngOnInit(): void {
    this.sharedService.viewPurchaseDetails().subscribe(res=>{
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
        this.ngOnInit();
      }else{
        alert(res.message)
      }
    })
   }

   onPurchaseAdd(){
    this.router.navigateByUrl('admin/purchase/addvehicle')
   }

   onEditPurchase(carNo:any){
    this.router.navigate(['admin/purchase/addvehicle'],{queryParams:{carno:carNo}})
   }
}
