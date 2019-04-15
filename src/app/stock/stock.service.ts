import { Injectable } from '@angular/core';
//import { IAccount } from './account';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class StockService {
    private accountUrl = 'https://api.iextrading.com/1.0';

    constructor(private http: HttpClient )
    {}

    getPrice(stockid: string) : Observable<string>
    {
        var ep = "/stock/"+stockid+"/price";
        return this.http.get<string>( this.accountUrl + ep ).pipe( tap( data => {
          console.log('Price: ' + JSON.stringify(data));
        }), 
        catchError(this.handleError));
    }


    private handleError(err: HttpErrorResponse)
    {
        let errorMessage = ' -- success--';
        
        if(err.error instanceof ErrorEvent)
        {
            errorMessage = 'an error occurred: '+ err.error.message;
        }
        else
        {
            console.log('Server returned code: ' + err.status +', error message is: '+ err.message + ' error is '+ err.error);
            errorMessage = err.error;
        }
        console.log(errorMessage);
        return throwError(errorMessage)
    }
    
    }