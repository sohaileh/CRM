import { Component } from '@angular/core';
import { SharedService } from './shared/service/shared-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public sharedService: SharedService){

  }

}
