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
  vehicleNo='';
  changesSaved=false;

  oldCar=true;
  balancedAmt:any='';

  documents:any={}
  constructor(private fb: FormBuilder,private purchaseService:PurchaseService,private router:Router, private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {

    this.vehicleDetails = this.fb.group({
      condition: ["old"],
      car_name: ["",[Validators.required,Validators.pattern('^[a-zA-Z0-9]*$')]],
      model: ["",[Validators.required,Validators.pattern('^[a-zA-Z]*$')]],
      color: ["",[Validators.required,Validators.pattern('^[a-zA-Z]*$')]],
      fuel_type: [""],
      engine_no: ["",[Validators.required,Validators.minLength(8),Validators.pattern('^[a-zA-Z0-9]*$')]],
      vehicle_no: ["",[Validators.required,Validators.pattern('^[a-zA-Z0-9]*$')]],
      registration:["",[Validators.required]],
      purchaseAgrement:["",[Validators.required]],
      totalAmount:["",[Validators.required]],
      paidAmount:["",[Validators.pattern('^[0-9]*$')]],
      balanceAmount:["",[Validators.required]],
    });

    if(this.purchaseService.vehicleDetails){
      this.vehicleDetails.patchValue(this.purchaseService.vehicleDetails)
      this.documents.registration=this.purchaseService.vehicleDetails.registration
      this.documents.purchaseAgrement=this.purchaseService.vehicleDetails.purchaseAgrement
    }

    this.activatedroute.queryParams.subscribe(prams=>{
      this.vehicleNo=prams['carno']
    })
    if(this.vehicleNo){
     this.purchaseService.findPurchase(this.vehicleNo).subscribe(res=>{
      this.purchaseService.allDetails=res.data
      this.vehicleDetails.patchValue(this.purchaseService.allDetails);
      this.documents.registration=this.purchaseService.allDetails.registration;
      this.documents.purchaseAgrement=this.purchaseService.allDetails.purchaseAgrement
    })
    }
  }
/////

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
        this.vehicleDetails.patchValue({registration:reader.result as string})
        this.documents.registration=reader.result as string;
      }else if(value==='purchaseAgre'){
        this.vehicleDetails.patchValue({purchaseAgrement:reader.result as string})
        this.documents.purchaseAgrement=reader.result as string
      }
    })
    reader.onerror=()=>{
      alert("Error")
    }
  }

  onNext(){
    if(this.vehicleDetails.valid ){
    this.purchaseService.vehicleDetails=this.vehicleDetails.value
    this.router.navigateByUrl('admin/purchase/addseller')
    }
  }

  onCancel(){
     this.vehicleDetails.reset;
     this.router.navigateByUrl('admin/purchase/purchaselist');
  }

  calculateBalanced(total:any,paid:any){
    this.balancedAmt=total-paid;
    this.vehicleDetails.patchValue({'balanceAmount':this.balancedAmt})
    if(this.balancedAmt<0){
      this.vehicleDetails.controls['balanceAmount'].setValue("")
    }
  }

  canExit(){
    if(!this.changesSaved){
      return confirm('your changes will be lost, Are you sure?')
    }
    return true;
  }

}
