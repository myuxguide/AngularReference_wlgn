import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AuthenticateComponent } from './authenticate.component';
import { RouterModule, Routes } from '@angular/router';
import { GlobalDataLayerModule } from '@fedex/global-data-layer-client';
import { ReactiveFormsModule } from '@angular/forms';
import { OtpFormComponent } from './otp-form/otp-form.component';

const routes: Routes = [
  { path: '', component: AuthenticateComponent }
];

@NgModule({
  declarations: [
    AuthenticateComponent,
    OtpFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    GlobalDataLayerModule,
    ReactiveFormsModule
  ],
  exports: [
    AuthenticateComponent
  ]
})

export class AuthenticateModule { }
