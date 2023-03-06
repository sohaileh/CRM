import { SharedService } from 'src/app/shared/service/shared-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/sales/services/sales.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _router:Router,private saleService:SalesService,public rout:ActivatedRoute,
   private sharedservice:SharedService) { }

  ngOnInit(): void {
  }

    onHome(){
      this._router.navigateByUrl('admin/dashboard')
    }

    viewSales(){
      this._router.navigateByUrl('admin/sales/saleslist')
    }

    viewPurchase(){
     this._router.navigateByUrl('admin/purchase/purchaselist')
    }

    onLogout(){
      this._router.navigateByUrl('admin/login')
    }

    sideNavClicked(){
       console.log("Side nav Clicked");

        }
}
