import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.scss']
})
export class AddSalesComponent implements OnInit {
  vehicleNo!: FormGroup;
  saleForm!: FormGroup;
  vehicleExists = false;
  fileName = "";
  vehicle = ["JK01A 1111", "JK01A 2222"];
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.vehicleNo = this.fb.group({
      vehicleNo: [""]
    }, Validators.required);
    this.saleForm = this.fb.group({
      fullName: [""],
      email: ["NA"],
      phone_no: [""],
      address: [""],
      postal_code: [""],
      sold_date: [""],
      sold_amount: [""],
      balance_amount: [""],
      docs: [null]
    }, Validators.required);
  }
  findVehicle(event: any) {
    if (this.vehicle.includes(event.target.value.trim().toUpperCase())) {
      this.vehicleExists = true;
      return;
    }
    this.vehicleExists = false;
  }
  documentChange(event: any) {
    const file: File = event.target.files[0];
    this.fileName = file.name;
    this.saleForm.get("docs")?.setValue(file);
  }
}
