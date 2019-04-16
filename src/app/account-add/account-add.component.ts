import { Component, OnInit } from '@angular/core';
import { IAccount } from '../account/account';
import { AccountService } from '../account/account.service';
import { StockService } from '../stock/stock.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'pm-account-add',
    templateUrl: './account-add.component.html',
    styleUrls: ['./account-add.component.css']
})

export class AccountAddComponent implements OnInit {
    pageTitle: string = 'Add A Purchase';
    account: IAccount = {
        _id: '',
        userId: 'asdf',  //default 
        stockId: '',
        purchaseAmount: 0,
        price: 0,
        shares: 0,
        datetime: ''
    };
    formattedAmount: string;
    shares: number;
    errorMessage: string;
    successMessage: string;
    currencyPipe: CurrencyPipe;

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
        this.successMessage = "";
        this.errorMessage = "";
        this.stockService.getPrice(this.account.stockId).subscribe( 
            price => {
                console.log("in price " + this.account.stockId + " " + this.account.purchaseAmount);
                this.account.price=Number(price);
                //rounding to 3 decimals for reasonableness
                this.account.shares = +(this.account.purchaseAmount/this.account.price).toFixed(3);
            },
            error => {
                this.account.price = 0;
                this.errorMessage = <any>error;
                this.successMessage = "";
            });
    }

    goBack(): void {
        this.router.navigateByUrl('/accountList');
    }
}
