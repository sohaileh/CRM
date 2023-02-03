import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/service/shared-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private sharedService: SharedService) {
    this.sharedService.isDashboardComponent=true;
  }
}
