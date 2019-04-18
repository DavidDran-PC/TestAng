import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountAddComponent } from './account-add/account-add.component';
import { CurrencyPipe } from '@angular/common';

//--------------------------------------------------------------------
// Modules
//--------------------------------------------------------------------

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AccountListComponent,
    AccountDetailComponent,
    AccountAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})

export class AppModule { }
