import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PurchaseService } from '../../services/purchase.service';
import { deactivateGuard } from 'src/app/authGuard/auth.guard';
import { AlertService } from 'src/app/alert/alert.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit, deactivateGuard,OnDestroy {
  vehicleDetails!: FormGroup;
  vehicleNo = null;;
  changesSaved = false;

  oldCar = true;
  balancedAmt: any = '';

  documents: any = {};
  constructor(
    private fb: FormBuilder,
    private purchaseService: PurchaseService,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private alertService:AlertService
  ) {}

  ngOnInit(): void {

    this.vehicleDetails = this.fb.group({
      condition: ['old'],
      car_name: ["",[Validators.required,Validators.pattern('^[a-zA-Z0-9]*$')]],
      model: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      color: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      fuel_type: [''],
      engine_no: ['',[Validators.required,Validators.minLength(8),Validators.pattern('^[a-zA-Z0-9]*$'),]],
      vehicle_no: ['',[Validators.required, Validators.pattern('[a-zA-Z]+[0-9]+[a-zA-Z]+[0-9]+')]],
      registration: ['', [Validators.required]],
      purchaseAgrement: ['', [Validators.required]],
      totalAmount: ['', [Validators.required]],
      paidAmount: ['', [Validators.pattern('^[0-9]*$')]],
      balanceAmount: ['', [Validators.required]],
    });

    this.activatedroute.queryParams.subscribe(prams=>{
      this.vehicleNo=prams['carno']
    })

    if(this.vehicleNo){
     this.purchaseService.findPurchase(this.vehicleNo).subscribe(res=>{
      this.purchaseService.allDetails.next(res.data)
      this.vehicleDetails.patchValue(res.data);
      this.documents.registration=res.data.registration
      this.documents.purchaseAgrement=res.data.purchaseAgrement
    })
    }

    if(this.purchaseService.isBack){
      this.purchaseService.vehicleDetails.subscribe((res)=>{
        this.vehicleDetails.patchValue(res.value)
        this.documents.registration=res.value.registration
      this.documents.purchaseAgrement=res.value.purchaseAgrement
      })
    }
  }


  getChassisNo() {
    this.oldCar = !this.oldCar;
  }
  //  Documnets//
  upload(event: any, value: any) {
    const file = event.target.files[0];
    if(file.size>100000){
      Swal.fire('Error',"Image Size Should Be Less than 100kb")
      return
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      if (value === 'rc') {
        this.vehicleDetails.patchValue({
          registration: reader.result as string,
        });
        this.documents.registration = reader.result as string;
      } else if (value === 'purchaseAgre') {
        this.vehicleDetails.patchValue({
          purchaseAgrement: reader.result as string,
        });
        this.documents.purchaseAgrement = reader.result as string;
      }
    });
    reader.onerror = () => {
      alert('Error');
    };
  }

  onNext(){
    if(this.vehicleDetails.valid ){
      this.purchaseService.vehicleSubjectRaised(this.vehicleDetails)
      this.changesSaved=true;
      this.router.navigateByUrl('admin/purchase/addseller')
    }
  }


  onCancel(){
    this.changesSaved=true;
    this.vehicleDetails.reset;
    this.router.navigateByUrl('admin/purchase');
    this.purchaseService.vehicleDetails.complete();
  }

  calculateBalanced(total:any,paid:any){
    this.balancedAmt=total-paid;
    this.vehicleDetails.patchValue({'balanceAmount':this.balancedAmt})
    if(this.balancedAmt<0){
      this.vehicleDetails.controls['balanceAmount'].setValue("")
    }
  }

  canExit() {
    if (!this.changesSaved) {
      return this.alertService.confirmation('Are you sure?',"You won't be able to revert this!",'warning',)
    }
    return true;
  }

  ngOnDestroy() {
    this.purchaseService.isBack=false
  }
}
