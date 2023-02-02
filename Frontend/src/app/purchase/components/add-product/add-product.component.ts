import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PurchaseService } from '../../services/purchase.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  vehicleDetails!: FormGroup;
  sellerDetails!: FormGroup;
  purchaseDetail!:FormGroup;

  vehicleDocuments:any={
    registration:'',
    purchaseAgrement:''
  }
  sellerDocumnets:any=[{
    identityProof:'',
    addressProof:''
  }]

  oldCar=true;
  constructor(private fb: FormBuilder,private purchaseService:PurchaseService) { }

  ngOnInit(): void {
    this.vehicleDetails = this.fb.group({
      condition: ["old"],
      car_name: [""],
      model: [""],
      color: [""],
      fuel_type: [""],
      engine_no: [""],
      vehicle_no: [""],
    }, Validators.required);

    this.sellerDetails = this.fb.group({
      fullName: [""],
      email: ["NA"],
      phone_no: [""],
      address: [""],
      postal_code: [""],
      purchase_date: [""],
    }, Validators.required);
    this.purchaseDetail=this.fb.group({
      totalAmt:[""],
      paidAmt:[""],
      balancedAmt:[""]
    })
  }

  getchassisno(){
    this.oldCar=!this.oldCar;
  }
// Car Documnets//
  uploadRc(event:any){
    this.vehicleDocuments.registration=event.target.files[0]
  }

  uploadPurchaseAgr(event:any){
    this.vehicleDocuments.purchaseAgrement=event.target.files[0]
    console.log(this.vehicleDocuments);
  }

//Seller Documents
  uploadIdentityProof(event:any){
    this.sellerDocumnets.identityProof=event.target.files[0]
  }
  uploadAddressProof(event:any){
    this.sellerDocumnets.addressProof=event.target.files[0]
  }


  submitData(){
    if(this.vehicleDetails.invalid || this.sellerDetails.invalid || this.purchaseDetail.invalid){
      alert('Enter Valid Detais');
    }
   else{
      console.log("submit data sucessfully")
    this.purchaseService.storeVehicleData(this.vehicleDetails.value,this.purchaseDetail.value,this.vehicleDocuments);
    this.purchaseService.storeSellerData(this.sellerDetails.value,this.sellerDocumnets);
    }
  }

}
