import { Validators } from '@angular/forms';

export interface SellerModel extends Validators {
      seller_name: [string,Validators]
      email:[string,Validators],
      phone_no:[number,Validators],
      address:[string,Validators],
      postal_code:[number,Validators],
      purchase_date:Date,
      aadhar_card:any,
      pan_card:any
}
