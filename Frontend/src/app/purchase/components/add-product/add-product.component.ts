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
      registration:null,
      purchaseAgrement:null
    });

    this.sellerDetails = this.fb.group({
      seller_name: [""],
      email: [""],
      phone_no: [""],
      address: [""],
      postal_code: [""],
      purchase_date: [""],
      identityProof:null,
      addressProof:null
    });
  }

  getChassisNo(){
    this.oldCar=!this.oldCar;
  }
// Car Documnets//
  uploadRc(event:any){
    const file=event.target.files[0];
    const reader=new FileReader();

    reader.addEventListener("load",()=>{
     // console.log(reader.result)
    })
    reader.readAsDataURL(file)

    this.vehicleDetails.patchValue({registration:reader})

  }

  uploadPurchaseAgr(event:any){
    const file=event.target.files[0];
    const reader=new FileReader();

    reader.addEventListener("load",()=>{
     // console.log(reader.result)
    })
    reader.readAsDataURL(file)

    this.vehicleDetails.patchValue({purchaseAgrement:reader})
  }

//Seller Documents
  uploadIdentityProof(event:any){
    const file=event.target.files[0];
    const reader=new FileReader();

    reader.addEventListener("load",()=>{
      //console.log(reader.result)
    })
    reader.readAsDataURL(file)
    this.sellerDetails.patchValue({identityProof:reader})
  }
  uploadAddressProof(event:any){
    const file=event.target.files[0];
    const reader=new FileReader();

    reader.addEventListener("load",()=>{
     // console.log(reader.result)
    })
    reader.readAsDataURL(file)
    this.sellerDetails.patchValue({addressProof:reader})
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
      let allDetails=this.vehicleDetails.value;
      Object.assign(allDetails,this.sellerDetails.value)

      this.purchaseService.addPurchaseDetails(allDetails).subscribe((res)=>{
        if(res.status==201){
          alert(res.msg);
          this.router.navigateByUrl('admin/dashboard')
          this.showVehicleTemplate=!this.showVehicleTemplate
        }else{
          alert("something went wrong")
        }

      })

    }

    else
    alert("Enter Correct Details")
  }

  onCancel(){
    this.vehicleDetails.reset;
    this.router.navigateByUrl('admin/dashboard');
  }

  calculateBalanced(total:any,paid:any){
    this.balancedAmt=total-paid;
  }
}
