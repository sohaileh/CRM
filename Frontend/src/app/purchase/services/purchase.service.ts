import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor() { }
  vehicleDetails:any=[]
  sellerDetails:any=[]

  storeVehicleData(vehicleDetail:any,purchaseDetail:any,vehicleDoc:any){
    Object.assign(vehicleDetail,purchaseDetail)
    this.vehicleDetails.push({vehicle:vehicleDetail,vehicleDocument:vehicleDoc})
  }
  storeSellerData(sellerDetails:any,sellerDocuments:any){
    this.sellerDetails.push({seller:sellerDetails,sellerDoc:sellerDocuments})
    console.log(this.sellerDetails);
  }

}
