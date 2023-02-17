import { AlertService } from 'src/app/alert/alert.service';
import { PurchaseService } from './../../services/purchase.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-seller',
  templateUrl: './add-seller.component.html',
  styleUrls: ['./add-seller.component.scss']
})
export class AddSellerComponent implements OnInit {
  sellerDetails!:FormGroup;

  sellerDocuments:any={}
  updateToggle=false;
  constructor(private fb:FormBuilder, private router:Router,
    private purchaseService:PurchaseService,
    private alertservice:AlertService,
    ) { }

  ngOnInit(): void {
    this.sellerDetails = this.fb.group({
      seller_name: ["",[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      email: ["",[Validators.required,Validators.email]],
      phone_no: ["",[Validators.required]],
      address: ["",[Validators.required,Validators.pattern('^[a-zA-Z0-9 ]*$')]],
      postal_code: ["",[Validators.required,Validators.minLength(6)]],
      purchase_date: ["",[Validators.required]],
      aadhar_card:["",[Validators.required]],
      pan_card:["",[Validators.required]]
    });

    if(this.purchaseService.allDetails){
      this.updateToggle=!this.updateToggle;
      this.sellerDetails.patchValue(this.purchaseService.allDetails)
      this.sellerDocuments.aadhar_card=this.purchaseService.allDetails.aadhar_card;
      this.sellerDocuments.pan_card=this.purchaseService.allDetails.pan_card;
    }
  }

  onSubmit(){
    if(this.purchaseService.allDetails){
      if(this.sellerDetails.valid){
        const allDetails=this.purchaseService.vehicleDetails
        Object.assign(allDetails,this.sellerDetails.value)
         this.purchaseService.updatePurchase(this.purchaseService.allDetails.vehicle_no,allDetails).subscribe((res)=>{
          this.alertservice.showInfo(res.message,"Done")
          this.router.navigateByUrl("admin/purchase/purchaselist")
         })
      }
    }else{
      if(this.sellerDetails.valid){
        const allDetails=this.purchaseService.vehicleDetails
       Object.assign(allDetails,this.sellerDetails.value)
        this.purchaseService.addPurchaseDetails(allDetails).subscribe((res)=>{
          this.alertservice.showSuccess(res.message,"Created")
          this.router.navigateByUrl('admin/purchase/purchaselist')
        },(err)=>{
          console.log(err)
        })
      }
    }

  }

  upload(event:any,name:string){
    const file=event.target.files[0]
    const reader=new FileReader();
    reader.readAsDataURL(file)
    reader.addEventListener("load",()=>{
      if(name==='aadhar'){
        this.sellerDetails.patchValue({aadhar_card:reader.result as string})
        this.sellerDocuments.aadhar_card=reader.result as string
      }else if(name==='pancard'){
        this.sellerDetails.patchValue({pan_card:reader.result as string})
        this.sellerDocuments.pan_card=reader.result as string
      }
    })
    }

  onBack(){
    this.router.navigateByUrl('admin/purchase/addvehicle')
  }
}
