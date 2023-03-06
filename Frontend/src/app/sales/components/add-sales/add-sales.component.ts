import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SalesService } from '../../services/sales.service';
import { SharedService } from 'src/app/shared/service/shared-service';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { AlertService } from 'src/app/alert/alert.service';
import { ISalesForm } from '../../model/saleForm.model';
import { deactivateGuard } from 'src/app/authGuard/auth.guard';
import Swal from "sweetalert2"
@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.scss'],
})
export class AddSalesComponent implements OnInit,deactivateGuard {
  changesSaved = false;
  dropdownSettings: IDropdownSettings = {
    singleSelection: true,
    itemsShowLimit: 10,
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
  dropDownList: any = [];
  id = this.router.snapshot.queryParamMap.get("id") ?? undefined;
  saleForm:FormGroup=this.fb.group<ISalesForm>({
    vehicle_no:["",Validators.required],
    fullName: ["", [Validators.required, Validators.pattern("^[a-zA-Z ]*$"), Validators.minLength(5)]],
    email:["NA", [Validators.required]],
    phone_no: [0, [Validators.required, Validators.minLength(10), Validators.pattern(/^[0-9]\d*$/)]],
    address:["", [Validators.required]],
    postal_code:[0, [Validators.required, Validators.minLength(6), Validators.pattern(/^[0-9]\d*$/)]],
    solddate:["", [Validators.required]],
    sold_amount:[0, [Validators.required,Validators.pattern(/^[0-9]\d*$/)]],
    paid_amount:[0],
    balance_amount:[0],
    documents:this.fb.group({
      bill:["",Validators.required],
      adhaar_card:["",Validators.required],
      pan_card:["",Validators.required],
      agreement:["",Validators.required]
    })
  });

  constructor(public saleService: SalesService, public alertService: AlertService, public sharedService: SharedService, public route: Router, private router: ActivatedRoute,private fb:FormBuilder) { }
  ngOnInit(): void {

    if (this.id !== undefined) {
      this.saleForm.enable();
      this.saleForm.get("vehicle_no")?.disable();
      this.saleService.http.get(`${this.sharedService.serverUrl}findsalebyvehicleno${this.id}`).subscribe((res: any) => {
        this.saleForm.patchValue(res.data);
      }, err => {
        this.alertService.showError(err.error.message,"Error")
      })
    }
    else {
      this.resetForm();
    }
  }
  getPurchases() {
    this.sharedService.getPurchasesDropDown().subscribe((res: any) => {
      this.dropDownList = res.data.map((vehicle: any) => {
        return vehicle.vehicle_no;
      });
    }, err => {
      this.alertService.showError(err.error.message,"Error")
    });
  }
  searchPurchase(event: any) {
    if ((this.saleForm.get("vehicle_no")?.touched && this.saleForm.get("vehicle_no")?.invalid) || !event.target.value.trim()) {
      return;
    }
    this.sharedService.getPurchasesDropDownByFilter(event.target.value.trim()).subscribe((res: any) => {
      this.dropDownList = res.data.map((vehicle: any) => {
        return vehicle.vehicle_no;
      });
    }, err => {
      this.alertService.showError(err.error.message,"Error")
    });
  }
  selectedVehicle(event: any) {
    if (event) {
      this.saleForm.get("vehicle_no")?.patchValue(event);
    }
  }
  deselectVehicle(event: any) {
    if (event) {
      this.saleForm.get("vehicle_no")?.patchValue("");
    }
  }
  resetForm() {
    this.saleForm.reset();
    this.saleForm.untouched;
  }
  documentChange(event: any, value: any) {
    const file: File = event.target.files[0];
    if (file.size>100000) {
      Swal.fire("Error","Image Size Should Be Less Than 100kb")
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (value === "adhaarCard")
      this.saleForm.get("documents")?.get("adhaar_card")?.setValue(fileReader.result as string);
      else if (value === "pan")
      this.saleForm.get("documents")?.get("pan_card")?.setValue(fileReader.result as string);
      else if (value === "bill")
      this.saleForm.get("documents")?.get("bill")?.setValue(fileReader.result as string);
      else
      this.saleForm.get("documents")?.get("agreement")?.setValue(fileReader.result as string);
    };
    fileReader.onerror = (err) => {
      alert('Some error ocurred' + err);
    };
  }
  submitSale(){
    this.saleForm.get("sold_date")?.setValue(this.sharedService.epoch(this.saleForm.value.sold_date));
    if (this.saleForm.invalid || this.saleForm.get("documents")?.invalid) {
      return;
    }
    this.saleService.uploadSale(this.saleForm.value).subscribe((res: any) => {
      this.alertService.showSuccess(res.message, "Success")
      this.changesSaved = true;
      this.route.navigateByUrl("/admin/sales/saleslist");
    }, err => this.alertService.showError(err.error.message, "Error"));
  }
  updateSale() {
    this.saleForm.get("sold_date")?.setValue(this.sharedService.epoch(this.saleForm.value.sold_date));
    if (this.saleForm.invalid || this.saleForm.get("documents")?.invalid) {
      return;
    }
    this.saleService.editSale(this.saleForm.value).subscribe((res: any) => {
      this.alertService.showSuccess(res.message, "Success");
      this.resetForm();
      this.changesSaved = true;
      this.route.navigateByUrl("/admin/sales/saleslist");
    }, err => {
      this.alertService.showError("Nothing modified", "Error");
      this.changesSaved = true;
      this.route.navigateByUrl("/admin/sales/saleslist");
    });
  }
  canExit() {
    if (!this.changesSaved) {
      return this.alertService.confirmation("Are you sure?","all changes will be lost","warning")
    }
    return true;
  }

  balanceAmount(soldAmount:number,paidAmount:number){
    this.saleForm.controls['balance_amount'].touched;
    this.saleForm.controls['balance_amount'].patchValue(soldAmount-paidAmount)
    if(this.saleForm.controls['balance_amount'].value<0){
      this.saleForm.controls['balance_amount'].setErrors(Validators.pattern)
    }
  }
}




