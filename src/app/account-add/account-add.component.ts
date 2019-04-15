import { Component, OnInit } from '@angular/core';
import { IAccount } from '../account/account';
import { AccountService } from '../account/account.service';
import { StockService } from '../stock/stock.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
    selector: 'pm-account-add',
    templateUrl: './account-add.component.html',
    styleUrls: ['./account-add.component.css']
})

export class AccountAddComponent implements OnInit {
    pageTitle: string = 'Add A Purchase';
    account: IAccount = {
        _id: '',
        userId: '',
        stockId: '',
        purchaseAmount: '',
        datetime: ''
    };
    currentPrice: string;
    errorMessage: string;
    successMessage: string

    constructor( private route: ActivatedRoute, private router: Router, private accountService: AccountService, private stockService: StockService) {
    }
    ngOnInit(): void {
      
    }
        public addAccount(event: Event) {
        console.log('in addAccount');
        this.successMessage = "";
        this.errorMessage = "";
        this.stockService.getPrice(this.account.stockId).subscribe( 
            price => {
                console.log("in price");
                this.accountService.addAccount(this.account).subscribe(
                    account => {
                        this.account = account;
                        this.successMessage = "Added Successfully";
                    },
                    error => {
                        console.log("in addAccount error");
                        this.errorMessage = <any>error; 
                    }
                );
            },
            error => {
                console.log("in getPrice error");
                this.successMessage = "";
                this.errorMessage = <any>error;
            }
        );
    }

    public getPrice() {
        this.stockService.getPrice(this.account.stockId).subscribe( 
            price => {
                console.log("in price " + this.account.stockId);
                this.currentPrice=price
            },
            error => {
                this.currentPrice = "0.00";
                this.errorMessage = <any>error;
                this.successMessage = "";
            });
    }

    goBack(): void {
        this.router.navigateByUrl('/accountList');
    }
}
