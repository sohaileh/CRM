import { NgModule } from "@angular/core";
import{RouterModule,Routes} from '@angular/router'
import { ProductsListComponent } from "./components/products-list/products-list.component";
import { AddProductComponent } from "./components/add-product/add-product.component";

const routes:Routes=[{
  path:'purchaselist',component:ProductsListComponent
},
{path:'addvehicle',component:AddProductComponent},
{path:'',redirectTo:'purchaselist',pathMatch:"full"}
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})

export class PurchaseRoutingModule{

}
