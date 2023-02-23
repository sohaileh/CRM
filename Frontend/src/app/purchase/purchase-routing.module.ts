import { LayoutComponent } from './components/layout/layout.component';
import { AddSellerComponent } from './components/add-seller/add-seller.component';
import { NgModule } from "@angular/core";
import{RouterModule,Routes} from '@angular/router'
import { ProductsListComponent } from "./components/products-list/products-list.component";
import { AddProductComponent } from "./components/add-product/add-product.component";
import { AuthGuard } from "../authGuard/auth.guard";


const routes:Routes=[
  {path:"",component:LayoutComponent,children:[
    {path:"",redirectTo:"purchaselist",pathMatch:'full'},
    {path:'purchaselist',component:ProductsListComponent},
    {path:'addvehicle',component:AddProductComponent,canDeactivate:[AuthGuard]},
    {path:'addseller',component:AddSellerComponent,canDeactivate:[AuthGuard]}
  ]}

]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})

export class PurchaseRoutingModule{

}
