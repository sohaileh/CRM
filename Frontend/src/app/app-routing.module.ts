import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSalesComponent } from './sales/components/add-sales/add-sales.component';
import { SalesListComponent } from './sales/components/sales-list/sales-list.component';
import { AddProductComponent } from './purchase/components/add-product/add-product.component';
import { ProductsListComponent } from './purchase/components/products-list/products-list.component';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { LoginComponent } from './authentication/components/login/login.component';

const routes: Routes = [
  {path:"admin/login",component:LoginComponent},
  {path:"admin/dashboard",component:DashboardComponent},
  {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
  {path:"sales",children:[
    {
      path:"addSale",component:AddSalesComponent,

    },
    {
      path:"salesList",component:SalesListComponent,
    }
  ]},
  {path:"purchase",children:[
      {
        path:"addVehicle",component:AddProductComponent
      },
      {
        path:"purchaseList",component:ProductsListComponent
      }
    ]
  },
  {path:"dashboard",component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
