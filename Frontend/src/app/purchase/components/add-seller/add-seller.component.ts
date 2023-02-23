import { deactivateGuard } from './../../../authGuard/auth.guard';

import { AlertService } from 'src/app/alert/alert.service';
import { PurchaseService } from './../../services/purchase.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-seller',
  templateUrl: './add-seller.component.html',
  styleUrls: ['./add-seller.component.scss']
})
export class AddSellerComponent implements OnInit,deactivateGuard {
  sellerDetails!:FormGroup;
  changesSaved=false;
  sellerDocuments:any={}
  buttonToggle=false;
  constructor(private fb:FormBuilder, private router:Router,
    private purchaseService:PurchaseService,
    private alertservice:AlertService,
    private alertService:AlertService
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
      pan_card:["",[Validators.required]],
    });
/*
    if(this.purchaseService.allDetails){
      this.buttonToggle=!this.buttonToggle;
      this.sellerDetails.patchValue(this.purchaseService.allDetails)
      this.sellerDocuments.aadhar_card=this.purchaseService.allDetails.aadhar_card;
      this.sellerDocuments.pan_card=this.purchaseService.allDetails.pan_card;
    }
    */
    if(this.purchaseService.isUpdate){
      this.purchaseService.allDetails.subscribe((res)=>{
        this.buttonToggle=!this.buttonToggle;
        this.sellerDetails.patchValue(res);
        this.sellerDetails.patchValue({purchase_date:new Date(res.purchase_date).toISOString().slice(0, 10)})
        this.sellerDocuments.aadhar_card=res.aadhar_card;
        this.sellerDocuments.pan_card=res.pan_card;
      })
    }
  }

  onSubmit(){
    if(this.sellerDetails.valid){

      if(this.purchaseService.isUpdate){
        let modifiedDetails=""
        let carNo="";
        this.purchaseService.allDetails.subscribe((res)=>{
          carNo=res.vehicle_no
        })
        this.purchaseService.vehicleDetails.subscribe((res)=>{
          modifiedDetails=res.value
        })
        Object.assign(modifiedDetails,this.sellerDetails.value);
        this.purchaseService.updatePurchase(carNo,modifiedDetails).subscribe((res)=>{
          this.alertservice.showSuccess(res.message,"Done")
          this.changesSaved=true;

          this.router.navigateByUrl('admin/purchase')
        },(err)=>{
          Swal.fire(err.error.message)
          //this.alertservice.showError(err.error.message,"Error");
        })
      }else{
        let allDetails:any;
        this.purchaseService.vehicleDetails.subscribe((res)=>{
         allDetails=res.value;
        })
        Object.assign(allDetails,this.sellerDetails.value)
        this.purchaseService.addPurchaseDetails(allDetails).subscribe((res)=>{
          this.alertservice.showSuccess(res.message,"Created")
          this.changesSaved=true;
          this.router.navigateByUrl('admin/purchase/purchaselist')
        },(err)=>{
          this.alertservice.showError(err.error.message,"Error")
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

    canExit() {
      if (!this.changesSaved) {
        return this.alertService.confirmation('Are you sure?',"You won't be able to revert this!",'warning',)
      }
      return true;
    }

  onBack(){
    this.changesSaved=true
    this.purchaseService.isBack=true;
    this.router.navigateByUrl('admin/purchase/addvehicle')
  }
}
