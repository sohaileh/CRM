import {Validators} from "@angular/forms";

export interface ISalesForm extends Validators{
  vehicle_no:[string,Validators];
  fullName:[string,Validators];
  email:[string,Validators];
  phone_no:[number,Validators];
  address:[string,Validators];
  postal_code:[number,Validators];
  solddate:[string,Validators];
   sold_amount:[number,Validators];
   paid_amount:[number]
   balance_amount:[number];
   documents:any;
};
