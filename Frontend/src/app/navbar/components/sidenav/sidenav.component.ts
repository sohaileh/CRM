import { SharedService } from 'src/app/shared/service/shared-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {


  username:string='';
  constructor(private sharedservice:SharedService) { }
  ngOnInit(): void {
    this.username='admin'
  }

}
