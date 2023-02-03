import { Router } from '@angular/router';
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

  vehicleDocuments:any={
    registration:'',
    purchaseAgrement:''
  }
  sellerDocumnets:any=[{
    identityProof:'',
    addressProof:''
  }]
  showVehicleTemplate:boolean=true;
  oldCar=true;
  balancedAmount:any='';
  constructor(private fb: FormBuilder,private purchaseService:PurchaseService,private router:Router) { }

  ngOnInit(): void {
    this.showVehicleTemplate=true;
    this.vehicleDetails = this.fb.group({
      condition: ["old"],
      car_name: [""],
      model: [""],
      color: [""],
      fuel_type: [""],
      engine_no: [""],
      vehicle_no: [""],
      vehicleRc:[""],
      vehiclePurchaseAgrement:[""],
      totalAmount:[""],
      paidAmount:[""],
      balanceAmount:[""]
    }, Validators.required);

    this.sellerDetails = this.fb.group({
      fullName: [""],
      email: [""],
      phone_no: [""],
      address: [""],
      postal_code: [""],
      purchase_date: [""],
      identityProof:[''],
    addressProof:['']

    }, Validators.required);
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
  }

//Seller Documents
  uploadIdentityProof(event:any){
    this.sellerDocumnets.identityProof=event.target.files[0]
  }
  uploadAddressProof(event:any){
    this.sellerDocumnets.addressProof=event.target.files[0]
  }

  saveVehicle(){
    if(this.vehicleDetails.valid){
      this.showVehicleTemplate=!this.showVehicleTemplate;
    }
    else{
      alert('Enter All Details')
    }
  }

  onAddPurchase(){
    if(this.sellerDetails.valid){
      this.purchaseService.storeVehicleData(this.vehicleDetails)
      this.purchaseService.storeSellerData(this.sellerDetails)
      this.router.navigateByUrl('admin/dashboard')
      this.showVehicleTemplate=!this.showVehicleTemplate
    }

    else
    alert("Enter Correct Details")
  }

  onCancel(){
    this.vehicleDetails.reset;
    this.router.navigateByUrl('admin/dashboard');
  }

  calculateBalanced(total:any,paid:any){
    this.balancedAmount=total-paid;
  }
}
