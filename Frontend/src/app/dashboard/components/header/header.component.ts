import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

    onHome(){
      this._router.navigateByUrl('admin/dashboard')
    }

    addSale(){
      this._router.navigateByUrl('admin/sales/addsale')
    }

    viewSales(){
      this._router.navigateByUrl('admin/sales/saleslist')
    }

    addPurchase(){
      this._router.navigateByUrl('admin/purchase/addvehicle')
    }

    viewPurchase(){
     this._router.navigateByUrl('admin/purchase/purchaselist')
    }

    onLogout(){
      this._router.navigateByUrl('admin/login')
    }
}
