import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SalesService } from '../../services/sales.service';
import { SharedService } from 'src/app/shared/service/shared-service';
import { ActivatedRoute, Router } from '@angular/router';
 import {IDropdownSettings} from "ng-multiselect-dropdown";
import { AlertService } from 'src/app/alert/alert.service';
@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.scss']
})
export class AddSalesComponent implements OnInit {
  changesSaved=false;
  dropdownSettings:IDropdownSettings={
    singleSelection: true,
    itemsShowLimit: 10,
    allowSearchFilter: true,
    closeDropDownOnSelection:true
  };
  dropDownList:any=[];
  id=this.router.snapshot.queryParamMap.get("id")??undefined;
  imagesUrl = {
    documents: {
      adhaar_card: "",
      agreement: "",
      bill: "",
      pan_card: ""
    }
  };
  saleForm = new FormGroup({
    vehicle_no: new FormControl("", [Validators.required]),
    fullName: new FormControl("", [Validators.required,Validators.pattern("^[a-zA-Z ]*$"),Validators.minLength(5)]),
    email: new FormControl("NA", [Validators.required]),
    phone_no: new FormControl("",[Validators.required,Validators.minLength(10),Validators.pattern(/^[0-9]\d*$/)]),
    address: new FormControl("", [Validators.required]),
    postal_code: new FormControl("", [Validators.required,Validators.minLength(6),Validators.pattern(/^[0-9]\d*$/)]),
    sold_date: new FormControl("", [Validators.required]),
    sold_amount: new FormControl("", [Validators.required]),
    balance_amount: new FormControl("",[Validators.required]),
    bill_no: new FormControl("",[Validators.required]),
    adhaar_no: new FormControl("", [Validators.required,Validators.minLength(12),Validators.maxLength(12)]),
    documents: new FormControl({},[Validators.required])
  });

  constructor(public saleService: SalesService, private alertService:AlertService,public sharedService:SharedService, public route: Router,private router:ActivatedRoute) { }
  ngOnInit(): void {
    this.saleForm.disable();
    if (this.id!==undefined) {
      this.saleForm.enable();
      this.saleForm.get("vehicle_no")?.disable();
      this.saleService.http.get(`${this.sharedService.serverUrl}findsalebyvehicleno${this.id}`).subscribe((res:any)=>{
        this.saleForm.patchValue(res.data);
        this.imagesUrl.documents=res.data.documents;
      },err=>{
        console.log(err);
      })
    }
    else {
      this.resetForm();
    }
  }
  getPurchases(){
  this.sharedService.getPurchasesDropDown().subscribe((res:any)=>{
    this.dropDownList=res.data.map((vehicle:any)=>{
      return vehicle.vehicle_no;
    });
  },err=>{
    console.log(err);
  });
  }
  searchPurchase(event:any){
    if((this.saleForm.get("vehicle_no")?.touched && this.saleForm.get("vehicle_no")?.invalid) || !event.target.value.trim() ){
      return;
    }
    this.sharedService.getPurchasesDropDownByFilter(event.target.value.trim()).subscribe((res:any)=>{
      this.dropDownList=res.data.map((vehicle:any)=>{
        return vehicle.vehicle_no;
      });
    },err=>{
   console.log(err);
    });
  }
  selectedVehicle(event:any){
     if(event){
      this.saleForm.get("vehicle_no")?.setValue(event);
       this.saleForm.enable();
     }
  }
   deselectVehicle(event:any){
    if(event){
      this.saleForm.get("vehicle_no")?.setValue("");
      this.saleForm.disable();
    }
   }
  resetForm() {
    this.saleForm.reset();
    this.saleForm.untouched;
  }
  documentChange(event: any, value: any) {
    const file: File = event.target.files[0];
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (value === "adhaarCard")
        this.imagesUrl.documents.adhaar_card = fileReader.result as string;
      else if (value === "pan")
        this.imagesUrl.documents.pan_card = fileReader.result as string;
      else if (value === "bill")
        this.imagesUrl.documents.bill = fileReader.result as string;
      else
        this.imagesUrl.documents.agreement = fileReader.result as string;
    };
    fileReader.onerror = (err) => {
      alert("Some error ocurred" + err);
    };
  }
  submitSale() {
   this.invalidFormData();
    this.saleService.uploadSale(this.saleForm.value).subscribe((res: any) => {
        this.alertService.showSuccess(res.message,"Success")
      this.changesSaved=true;
      this.route.navigateByUrl("/admin/sales/saleslist");
    }, err => this.alertService.showError(err.error.message,"Error"));
  }
  updateSale() {
    this.invalidFormData();
    this.saleService.editSale(this.saleForm.value).subscribe((res: any) => {
      this.alertService.showSuccess(res.message,"Success");
      console.log(res);
      this.resetForm();
      this.changesSaved=true;
      this.route.navigateByUrl("/admin/sales/saleslist");
    }, err => {
      this.alertService.showError("Something went wrong","Error");
      this.route.navigateByUrl("/admin/sales/saleslist");
    });
  }


  canExit(){
    if(!this.changesSaved){
      return confirm('your changes will be lost, Are you sure?')
    }
    return true;
  }
  invalidFormData(){
    this.saleForm.get("documents")?.setValue(this.imagesUrl.documents);
    if (this.saleForm.disabled) {
      this.saleForm.enable();
      if(this.saleForm.invalid){
        this.saleForm.disable();
      return;
      }
  }
  if(!(this.imagesUrl.documents.adhaar_card.length&&this.imagesUrl.documents.bill.length&& this.imagesUrl.documents.pan_card.length&&this.imagesUrl.documents.agreement.length))
  return;
  }
}
