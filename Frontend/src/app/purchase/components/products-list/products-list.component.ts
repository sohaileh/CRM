import { PurchaseService } from './../../services/purchase.service';
import { AlertService } from 'src/app/alert/alert.service';
import { Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from 'src/app/shared/service/shared-service';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})

export class ProductsListComponent implements OnInit{

  @ViewChild("paginator") set paginator(matPaginator: MatPaginator) {
    if (matPaginator) {
      this.purchaseList.paginator = matPaginator;
    }
  }

  constructor(public sharedService: SharedService,private purchaseService:PurchaseService,
    private router:Router,private alertservice:AlertService) {
     }
  purchaseList!:MatTableDataSource<any>;
  length:any;

  options:any=[]
  showSearchResult=false;
  filterData:any;
  displayedColumns = ["vehicle_no","model","car_name" ,"seller_name", "purchase_date", "actions"]
  ngOnInit(): void {
    this.purchaseService.isUpdate=false;

    this.sharedService.viewPurchaseDetails().subscribe(res=>{
        this.purchaseList=new MatTableDataSource(res.data);
        this.length=this.purchaseList.data.length
    })
  }


  onPurchaseDelete(carNo:any){
    Swal.fire({
      title:'Delete Vehicle',
      text:`Are you sure to delete this Vehicle ${carNo}`,
      showCloseButton:true,
        showCancelButton:true,
        cancelButtonText:"Cancel",
        showConfirmButton:true,
        confirmButtonText:"Delete"
    }).then(result=>{
      if(result.isConfirmed){
        this.purchaseService.deletePurchase(carNo).subscribe((res)=>{
          this.alertservice.showSuccess(res.message,"success")
          this.ngOnInit()
        })
      }else if(result.isDismissed){
        this.alertservice.showInfo("Vehicle Not Deleted","Done")
      }
    })
   }

   onPurchaseAdd(){
    this.router.navigateByUrl('admin/purchase/addvehicle')
   }

   onUpdatePurchase(carNo:any){
    this.purchaseService.isUpdate=true;
    this.router.navigate(['admin/purchase/addvehicle'],{queryParams:{carno:carNo}})
   }

   applyFilter(searchText:string){
    if(searchText.length){
      this.purchaseService.getVehicleNumber(searchText)
      .subscribe((res)=>{
        this.options=[]
      this.filterData=res.data;
      this.filterData.forEach((item:any)=>{
        this.options.push(item.vehicle_no)
      })
      })
    }else{
      this.ngOnInit()
    }
   }

   onSearch(searchtext:string){
    if(searchtext.length){
      this.purchaseService.findPurchase(searchtext).subscribe((res)=>{
        if(res.data){
          let vehcile=new Array(res.data)
          this.purchaseList=new MatTableDataSource(vehcile);
          this.length=this.purchaseList.data.length
        }else{
          this.length=res.data
        }
      },(err)=>{
        console.log(err)
      })
    }
   }

}
