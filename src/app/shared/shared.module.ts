import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './components/popup/popup.component';
import { TranslateModule } from '@ngx-translate/core';
import { CustomerSupportComponent } from './components/customer-support/customer-support.component';
import { ForgotUseridComponent } from './components/forgot-userid/forgot-userid.component';
import { AuthenticationPopupComponent } from '../features/authenticate/authentication-popup/authentication-popup.component';


@NgModule({
  declarations: [
    PopupComponent,
    CustomerSupportComponent,
    ForgotUseridComponent,
    AuthenticationPopupComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    PopupComponent, TranslateModule, CustomerSupportComponent, PopupComponent, TranslateModule, ForgotUseridComponent, AuthenticationPopupComponent
  ]
})
export class SharedModule { }
