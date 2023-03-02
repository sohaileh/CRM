import {Validators} from "@angular/forms";

export interface ISalesForm extends Validators{
  vehicle_no:[string,Validators];
  fullName:[string,Validators];
  email:[string,Validators];
  phone_no:[number,Validators];
  address:[string,Validators];
  postal_code:[number,Validators];
  sold_date:[number,Validators];
   sold_amount:[number,Validators];
   balance_amount:[number];
   bill_no:[string,Validators];
   adhaar_no:[number,Validators];
   documents:any;
};
