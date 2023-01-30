import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  vehicleDetails!: FormGroup;
  ownerDetails!: FormGroup;
  carImage = "";
  carDoc = "";
  ownerDoc = "";
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.vehicleDetails = this.fb.group({
      condition: ["used"],
      car_name: [""],
      model: [""],
      color: [""],
      fuel_type: [""],
      engine_cc: [""],
      year: [""],
      vehicle_no: [""],
      car_images: [null],
      car_docs: [null],
    }, Validators.required);
    this.ownerDetails = this.fb.group({
      fullName: [""],
      email: ["NA"],
      phone_no: [""],
      address: [""],
      postal_code: [""],
      purchase_date: [""],
      purchase_amount: [""],
      balance_amount: [""],
      docs: [null],
    }, Validators.required);
  }
  changeCarIamges(event: any) {
    const file: FileList = event.target.files;
    this.vehicleDetails.get("car_images")?.setValue(file);
    for (let i = 0; i < file.length; i++) {
      this.carImage += file[i].name;
    }
  }
  changeCarDocs(event: any) {
    const file: File = event.target.files[0];
    this.vehicleDetails.get("car_docs")?.setValue(file);
    this.carDoc = file.name;
  }
  documentChange(event: any) {
    const file: File = event.target.files[0];
    this.ownerDetails.get("docs")?.setValue(file);
    this.ownerDoc = file.name;
  }
}
