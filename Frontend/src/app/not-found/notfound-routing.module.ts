import { RouterModule } from "@angular/router";
import{NgModule} from '@angular/core'
import {Routes} from '@angular/router'
import {NotFoundComponent} from '../not-found/not-found.component'

const notFoundRoutes: Routes=[
  {path:'notfound',component:NotFoundComponent},
  {path:'**',redirectTo:'notfound'}
]

@NgModule({
  imports:[RouterModule.forChild(notFoundRoutes)],
  exports:[RouterModule],
})

export class NotfoundRoutingModule{
}
