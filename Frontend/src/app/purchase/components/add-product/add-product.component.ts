import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PurchaseService } from '../../services/purchase.service';
import { deactivateGuard } from 'src/app/authGuard/auth.guard';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit,deactivateGuard {
  vehicleDetails!: FormGroup;
  sellerDetails!: FormGroup;
  vehicleNo='';
  changesSaved=false;

  showVehicleTemplate:boolean=true;
  oldCar=true;
  balancedAmt:any='';

  documents:any={
  registration:null,
  purchaseAgrement:null,
  aadharCard:null,
  panCard:null,
}
  constructor(private fb: FormBuilder,private purchaseService:PurchaseService,private router:Router, private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.showVehicleTemplate=true;
    this.vehicleDetails = this.fb.group({
      condition: ["old"],
      car_name: [""],
      model: [""],
      color: [""],
      fuel_type: [""],
      engine_no: ["",[Validators.required,Validators.minLength(8)]],
      vehicle_no: ["",[Validators.required,Validators.minLength(8)]],
      totalAmount:["",[Validators.required]],
      paidAmount:[""],
      balanceAmount:[""],

    });

    this.sellerDetails = this.fb.group({
      seller_name: ["",[Validators.required]],
      email: ["",[Validators.required,Validators.email]],
      phone_no: ["",[Validators.required,Validators.maxLength(10)]],
      address: ["",[Validators.required]],
      postal_code: ["",[Validators.required,Validators.minLength(6)]],
      purchase_date: ["",[Validators.required]],
    });

    this.activatedroute.queryParams.subscribe(prams=>{
      this.vehicleNo=prams['carno']
    })
    if(this.vehicleNo){
     this.purchaseService.findPurchase(this.vehicleNo).subscribe(res=>{
      this.vehicleDetails.patchValue(res.data);
      this.documents.registration=res.data.registration;
      this.documents.purchaseAgrement=res.data.purchaseAgrement
      this.sellerDetails.patchValue(res.data);
      this.documents.aadharCard=res.data.aadharCard
      this.documents.panCard=res.data.panCard
     })
    }
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
      }else if(value==='aadharcard'){
        this.documents.aadharCard=reader.result as string
      }else if(value==='pancard'){
        this.documents.panCard=reader.result as string
      }

    })
    reader.onerror=()=>{
      alert("Error")
    }
  }

  saveVehicle(){
    if(this.vehicleDetails.valid  && this.documents.registration!=null){
    this.showVehicleTemplate=!this.showVehicleTemplate;
    console.log(this.vehicleDetails.value);
    }
    else{
      alert('Upload the Documents ')
    }
  }

  onAddPurchase(){
    if(this.sellerDetails.valid){
      let allDetails=this.vehicleDetails.value;
      Object.assign(allDetails,this.sellerDetails.value,this.documents)
      if(this.vehicleNo){
        console.log("update Call")
        this.purchaseService.updatePurchase(this.vehicleNo,allDetails).subscribe((res)=>{
          alert(res.message)
          this.changesSaved=true;
          this.router.navigateByUrl('admin/purchase/purchaselist')
        },(err)=>{
          console.log(err)
          alert(err.message.message)
          this.router.navigateByUrl('admin/purchase/purchaselist')
        })
      }
      else{
        console.log("create call")
      this.purchaseService.addPurchaseDetails(allDetails).subscribe((res)=>{
          console.log(res)
          alert(res.message);
          this.changesSaved=true;
          this.router.navigateByUrl('admin/purchase/purchaselist')
          this.showVehicleTemplate=!this.showVehicleTemplate
      },(err)=>{
        alert(err.error.message)
      })
    }
    }
    else
    alert('Enter All Details')
  }

  onCancel(){
    this.vehicleDetails.reset;
    this.router.navigateByUrl('admin/purchase/purchaselist');
  }

  calculateBalanced(total:any,paid:any){
    this.balancedAmt=total-paid;
    this.vehicleDetails.patchValue({'balanceAmount':this.balancedAmt})
  }

  canExit(){
    if(!this.changesSaved){
      return confirm('your changes will be lost, Are you sure?')
    }
    return true;
  }

}
