import { Component, OnInit } from '@angular/core';
import { IAccount } from '../account/account';
import { AccountService } from '../account/account.service';
import { StockService } from '../stock/stock.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-accounts',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  pageTitle: string = 'Purchase List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  successMessage: string;
  errorMessage: string;
  filtervalue: string = 'All';

  filteredAccounts: IAccount[];
  accounts: IAccount[];

  constructor(private accountService: AccountService, private stockService: StockService, private router: Router) {
  }


  detailClick(e, i): void {
    console.log('it was clicked' + i);
    this.router.navigateByUrl('/accountDetail/' + i);
  }

  deleteClick(e, i): void {
    console.log('delete was clicked -- ' + i);
    this.accountService.deleteAccount(i).subscribe(
      account => {
        this.refresh("Deleted Successfully");
      },
      error => {this.errorMessage = <any>error; this.successMessage = "";}
    );
  }
  ngOnInit(): void {
    console.log('in ngOnInit');
    this.refresh("Retrieved Successfully");
  }

  refresh(message): void {
    console.log('in refresh');
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    var query = "";
    if(this.filtervalue!="All"&&this.filtervalue!="")
    {
      query = "/?stockId=" + this.filtervalue;
    } 
    
    this.accountService.getAccounts(query).subscribe(
      accounts => {
        if (!this.isEmpty(accounts)) {
          console.log("accounts = " + accounts);
          this.accounts = accounts;
          this.successMessage = message;
          this.errorMessage = "";
        }
        else {
          this.errorMessage = "Purchase list is empty";
          this.accounts = [];
          this.successMessage = "";
          console.log(this.errorMessage);
        }
      },
      error => {this.errorMessage = <any>error; this.successMessage = "";}
    );
    this.filteredAccounts = this.accounts;
  }

  goBack(): void {
    this.router.navigateByUrl('/');
  }

  goToAdd(): void {
    this.router.navigateByUrl('/accountAdd');
  }

  isEmpty(obj): boolean {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }
}
