import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from 'src/app/shared/service/shared-service';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  xsDevice = false;
  searchData = "";
  salesData = [
    {
      _id: 1,
      vehicle_no: "JK01A 1111",
      fullName: "Suhail Bhat",
      sold_on: new Date(),
      sold_amount: 100,
      balance_amount: 0
    },
    {
      _id: 2,
      vehicle_no: "JK01A 2222",
      fullName: "Suhail Ahmad",
      sold_on: new Date(),
      sold_amount: 200,
      balance_amount: 100
    }
  ]
  constructor(private sharedService: SharedService) { }
  salesList!: MatTableDataSource<any>;
  displayedColumns = ["sell_id", "vehicle_no", "fullName", "sold_date", "sold_amount", "balance_amount", "actions"]
  ngOnInit(): void {
    this.salesList = new MatTableDataSource(this.salesData);
    this.sharedService.isSmallDevice().subscribe(result => {
      this.xsDevice = result[0].mqAlias === "xs" ? true : false;
    });
  }
  ngAfterViewInit() {
    if (this.xsDevice)
      this.salesList.paginator = this.paginator;
  }
  searchSale() {
    this.salesList.filter = this.searchData.trim().toLowerCase();
  }
  clearSearch() {
    this.searchData = "";
    this.searchSale();
  }

}
