import { SharedService } from 'src/app/shared/service/shared-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor() { }
   sideNavOpened=true
  ngOnInit(): void {
  }

}
