import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountAddComponent } from './account-add/account-add.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'accountList', component: AccountListComponent },
  { path: 'accountDetail/:id', component: AccountDetailComponent },
  { path: 'accountAdd', component: AccountAddComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
