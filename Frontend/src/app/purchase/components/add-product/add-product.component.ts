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

  showVehicleTemplate:boolean=true;
  oldCar=true;
  balancedAmt:any='';

  documents:any={
  registration:null,
  purchaseAgrement:null,
  identityProof:null,
  addressProof:null,
}
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
      totalAmount:[""],
      paidAmount:[""],
      balanceAmount:[""],

    });

    this.sellerDetails = this.fb.group({
      seller_name: [""],
      email: [""],
      phone_no: [""],
      address: [""],
      postal_code: [""],
      purchase_date: [""],
    });
  }

  getChassisNo(){
    this.oldCar=!this.oldCar;
  }
//  Documnets//
  upload(event:any,value:any){
    const file=event.target.files[0];
    const reader=new FileReader();
    reader.readAsDataURL(file)
    reader.addEventListener("load",()=>{
      if(value==='rc'){
        this.documents.registration=reader.result as string;
      }else if(value==='purchaseAgre'){
        this.documents.purchaseAgrement=reader.result as string
      }else if(value==='identity'){
        this.documents.identityProof=reader.result as string
      }else if(value==='address'){
        this.documents.addressProof=reader.result as string
      }

    })
    reader.onerror=()=>{
      alert("Error")
    }
  }

  saveVehicle(){
    if(this.vehicleDetails.valid  && this.documents.registration!=null){
    this.showVehicleTemplate=!this.showVehicleTemplate;
    }
    else{
      alert('Enter All Details')
    }
  }

  onAddPurchase(){
    if(this.sellerDetails.valid){
      let allDetails=this.vehicleDetails.value;
      Object.assign(allDetails,this.sellerDetails.value,this.documents)

      this.purchaseService.addPurchaseDetails(allDetails).subscribe((res)=>{
        if(res){
          alert(res.message);
          this.router.navigateByUrl('admin/dashboard')
          this.showVehicleTemplate=!this.showVehicleTemplate
        }else{
          alert(res.message)
        }
      })
    }
    else
    alert('Enter All Details')
  }

  onCancel(){
    this.vehicleDetails.reset;
    this.router.navigateByUrl('admin/dashboard');
  }

  calculateBalanced(total:any,paid:any){
    this.balancedAmt=total-paid;
  }

}
