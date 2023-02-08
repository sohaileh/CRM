import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from 'src/app/shared/service/shared-service';
import { SalesService } from '../../services/sales.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnInit {
  salesList!: MatTableDataSource<any>;
  displayedColumns = ["sNo", "vehicle_no", "fullName", "sold_date", "sold_amount", "balance_amount", "actions"];
  constructor(public sharedService: SharedService, public saleService: SalesService, public router: Router) { }
  ngOnInit(): void {
    this.sharedService.getSalesList().subscribe((res: any) => {
      if (res.data.length) {
        this.sharedService.salesData = res.data;
    this.salesList = new MatTableDataSource(this.sharedService.salesData);
      }
    }, err => {this.sharedService.snackbarNotification(err.error.message, "OK", {
      duration: 3000,
      panelClass: ['snackbar-fail']
    });
    if(err.status===401||403)
    this.sharedService.unAuthorized();
    });
  }
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    if (paginator != undefined) {
      this.salesList.paginator = paginator;

    }
  }
  updateSale(index: any) {
    this.saleService.index = index;
    this.router.navigateByUrl("/admin/sales/editsale");
  }
  deleteSale(sell_id: any) {
    if (!confirm("Are you sure to delete this sale")) {
      return;
    }
    this.saleService.deleteSale(sell_id).subscribe((res: any) => {
      this.sharedService.snackbarNotification(res.message, "OK", {
        duration: 3000,
        panelClass: ['snackbar-success']
      });
      this.reloadComponet();
    }, err => this.sharedService.snackbarNotification(err.error.message, "retry", {
      duration: 3000,
      panelClass: ['snackbar-fail']
    }));
  }
  reloadComponet() {
    this.router.navigate(["admin/dashboard"]).then(() => {
      return this.router.navigateByUrl("/admin/sales/saleslist");
    });
  }
}
