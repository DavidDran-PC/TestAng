import { Component, OnInit } from '@angular/core';
import { IAccount } from '../account/account';
import { AccountService } from '../account/account.service';
import { StockService } from '../stock/stock.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
    selector: 'pm-account-detail',
    templateUrl: './account-detail.component.html',
    styleUrls: ['./account-detail.component.css']
})

export class AccountDetailComponent implements OnInit {
    pageTitle: string = 'Purchase Detail';
    account: IAccount = {
        _id: '',
        userId: '',
        stockId: '',
        purchaseAmount: 0,
        price: 0,
        shares: 0,
        datetime: ''
    };
    errorMessage: string;
    successMessage: string;

    constructor( private route: ActivatedRoute, private router: Router, private accountService: AccountService, private stockService: StockService ) {
    }
    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        console.log("id=" + id);
        this.successMessage = "";
        this.errorMessage = "";
        this.accountService.getAccount(id).subscribe(
            account => {
                console.log("in AccountDetailComponent getAccount");
                this.account = account;
                this.stockService.getPrice(account.stockId).subscribe( 
                    price => {
                        console.log("in price");
                    },
                    error => {this.errorMessage = <any>error;});
                if (!this.errorMessage){
                    this.successMessage = "Retrieved Successfully";
                }
                
            },
            error => {this.errorMessage = <any>error;}
        );
    }
    public getPrice() {
        this.stockService.getPrice(this.account.stockId).subscribe( 
            price => {
                console.log("in price");
                this.account.price=Number(price);
                this.account.shares = +(this.account.purchaseAmount/this.account.price).toFixed(3);
            },
            error => {
                this.account.price = 0;
                this.errorMessage = <any>error;
                this.successMessage = "";
            });
    }

    public addAccount(event: Event) {
        console.log('in addAccount');
        this.successMessage = "";
        this.errorMessage = "";
        this.stockService.getPrice(this.account.stockId).subscribe( 
            price => {
                console.log("in price");
                this.account.price=Number(price);
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

    public changeAccount(event: Event) {
       console.log('in changeAccount');
        this.successMessage = "";
        this.errorMessage = "";
        this.accountService.changeAccount(this.account).subscribe(
            account => {
                this.account = account;
                this.successMessage = "Changed Successfully";
            },
            error => {this.errorMessage = <any>error;}
        );
    }

    public deleteAccount(event: Event) {
        console.log('in deleteAccount');
        this.successMessage = "";
        this.errorMessage = "";
        this.accountService.deleteAccount(this.account).subscribe(
            account => {
                this.account = account;
                this.successMessage = "Deleted Successfully";
            },
            error => {this.errorMessage = <any>error._body;}
        );
    }

    goBack(): void {
        this.router.navigateByUrl('/accountList');
    }
}
