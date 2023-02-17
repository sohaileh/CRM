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
  @ViewChild(MatPaginator) set paginator(matPaginator:MatPaginator){
    if(matPaginator!=undefined){
      this.purchaseList.paginator=matPaginator;
    }
  }

  constructor(public sharedService: SharedService,private purchaseService:PurchaseService,private router:Router) { }
  purchaseList!:MatTableDataSource<any>;
  length:any;

  displayedColumns = ["vehicle_no","model","car_name" ,"seller_name", "purchase_date", "actions"]
  ngOnInit(): void {
    this.purchaseService.allDetails=this.purchaseService.vehicleDetails="";

    this.sharedService.viewPurchaseDetails().subscribe(res=>{
      if(res){
        this.purchaseList=new MatTableDataSource(res.data);
        this.length=this.purchaseList.data.length
      }
    })
  }

  onPurchaseDelete(carNo:any){
    if(confirm(`Are You Sure to Delete Vehicle ${carNo}`)){
      this.purchaseService.deletePurchase(carNo).subscribe((res)=>{
        if(res){
          alert("Vehicle "+carNo+" "+res.message)
          this.ngOnInit();
        }else{
          alert(res.message)
        }
      })
    }else{
      return
    }

   }

   onPurchaseAdd(){
    this.router.navigateByUrl('admin/purchase/addvehicle')
   }

   onUpdatePurchase(carNo:any){
    this.router.navigate(['admin/purchase/addvehicle'],{queryParams:{carno:carNo}})
   }

   applyFilter(event:any){
    const filterValue=event.target.value;
    this.purchaseList.filter=filterValue.trim().toLowerCase();
   }

}
