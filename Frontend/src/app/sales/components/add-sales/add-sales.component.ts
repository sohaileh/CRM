import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SalesService } from '../../services/sales.service';
import { SharedService } from 'src/app/shared/service/shared-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.scss']
})
export class AddSalesComponent implements OnInit {
  vehicleExists = false;
  imagesUrl = {
    documents: {
      agreement: "",
      adhaar_card: ""
    }
  };
  vehicle = ["JK01A 1111", "JK01A 2222"];
  saleForm = new FormGroup({
    vehicle_no: new FormControl("", Validators.required),
    fullName: new FormControl("", Validators.required),
    email: new FormControl("NA", Validators.required),
    phone_no: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required),
    postal_code: new FormControl("", Validators.required),
    sold_date: new FormControl("", Validators.required),
    sold_amount: new FormControl("", Validators.required),
    balance_amount: new FormControl("", Validators.required),
    documents: new FormControl([""], Validators.required)
  });

  constructor(public saleService: SalesService, public sharedService: SharedService, private route: Router) { }
  ngOnInit(): void {
    if (this.saleService.index >= 0) {
      this.saleForm.get("vehicle_no")?.disable();
      this.saleForm.patchValue(this.sharedService.salesData[this.saleService.index]);
      this.imagesUrl.documents = this.sharedService.salesData[this.saleService.index].documents;
    }
    else {
      this.saleForm.reset();
    }
  }

  findVehicle(event: any) {
    if (this.vehicle.includes(event.target.value.trim().toUpperCase())) {
      this.vehicleExists = true;
      return;
    }
    this.vehicleExists = false;
  }
  resetForm() {
    this.saleForm.reset();
    this.saleForm.untouched;
    this.vehicleExists = false;
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
      else
        this.imagesUrl.documents.agreement = fileReader.result as string;
    };
    fileReader.onerror = (err) => {
      alert("Some error ocurred" + err);
    };
  }
  submitSale() {
    const images = [this.imagesUrl.documents.adhaar_card, this.imagesUrl.documents.agreement];
    this.saleForm.get("documents")?.setValue(images);
    if (this.saleForm.invalid) {
      return;
    }
    this.saleService.uploadSale(this.saleForm.value).subscribe((res: any) => {
      this.sharedService.snackbarNotification(res.message, "OK", {
        duration: 3000,
        panelClass: ['snackbar-success']
      });
      this.route.navigateByUrl("/admin/sales/saleslist");
    }, err => this.sharedService.snackbarNotification(err.error.message, "retry", {
      duration: 3000,
      panelClass: ['snackbar-fail']
    }));
  }
  updateSale() {
    this.saleForm.get("vehicle_no")?.enable();
    const images = [this.imagesUrl.documents.adhaar_card, this.imagesUrl.documents.agreement];
    this.saleForm.get("documents")?.setValue(images);
    if (this.saleForm.invalid) {
      return;
    }
    this.saleService.editSale(this.saleForm.value).subscribe((res: any) => {
      this.sharedService.snackbarNotification(res.message, "OK", {
        duration: 3000,
        panelClass: ['snackbar-success']
      });
      this.resetForm();
      this.saleService.index = -1;
      this.route.navigateByUrl("/admin/sales/saleslist");
    }, err => this.sharedService.snackbarNotification(err.error.message, "retry", {
      duration: 3000,
      panelClass: ['snackbar-fail']
    }));
  }
}
