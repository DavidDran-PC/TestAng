import { Injectable } from '@angular/core';
import { IAccount } from './account';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
    providedIn: 'root'
})

export class AccountService {
    private accountUrl = 'http://localhost:3005/api/accounts';

    constructor(private http: HttpClient)
    { }

    //--------------------------------------------------------------------
    // get all accounts based on query
    //--------------------------------------------------------------------
    getAccounts(query): Observable<IAccount[]> {

        return this.http.get<IAccount[]>(this.accountUrl + query).pipe(tap(data => {
            console.log('All: ' + JSON.stringify(data));
        }),
            catchError(this.handleError));
    }

    //--------------------------------------------------------------------
    // get account based on ID
    //--------------------------------------------------------------------
    getAccount(id): Observable<IAccount> {
        console.log("in service getAccount = " + id);
        return this.http.get<IAccount>(this.accountUrl + "/" + id).pipe(tap(data => console.log('One: ' + JSON.stringify(data))),
            catchError(this.handleError));
    }

    //--------------------------------------------------------------------
    // add an account 
    //--------------------------------------------------------------------
    addAccount(account): Observable<IAccount> {
        console.log('in addAccount AccountService');
        delete account._id;
        return this.http.post<IAccount>(this.accountUrl, account)
            .pipe(
            tap(
                data => {
                    console.log('addded: data=' + JSON.stringify(data));
                }),
            catchError(this.handleError)
            )
    }

    //--------------------------------------------------------------------
    // change an account 
    //--------------------------------------------------------------------
    changeAccount(account): Observable<IAccount> {
        console.log('in changeAccount AccountService')
        return this.http.put<IAccount>(this.accountUrl + "/" + account._id, account).pipe(tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError));
    }

    //--------------------------------------------------------------------
    // delete an account 
    //--------------------------------------------------------------------
    deleteAccount(account): Observable<IAccount> {
        console.log('in deleteAccount AccountService')
        return this.http.delete<IAccount>(this.accountUrl + "/" + account._id).pipe(tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError));
    }

    //--------------------------------------------------------------------
    // handle errors
    //--------------------------------------------------------------------
    private handleError(err: HttpErrorResponse) {

        let errorMessage = ' -- success--';

        if (err.error instanceof ErrorEvent) {
            errorMessage = 'an error occurred: ' + err.error.message;
        }
        else {
            console.log('Server returned code: ' + err.status + ', error message is: ' + err.message + ' error is ' + err.error);
            errorMessage = err.error;
        }
        console.log(errorMessage);
        return throwError(errorMessage)
    }

}