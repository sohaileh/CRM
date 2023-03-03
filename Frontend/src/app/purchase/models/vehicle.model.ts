import { Validators } from '@angular/forms';

export interface VehicleModel {
      condition:[string,Validators],
      car_name: [string,Validators],
      model: [string,Validators],
      color: [string,Validators],
      fuel_type:[string,Validators],
      engine_no:[string,Validators],
      vehicle_no:[string,Validators],
      registration:[any],
      purchaseAgrement:[any],
      totalAmount: [number,Validators],
      paidAmount: [number],
      balanceAmount:[number,Validators],
}
