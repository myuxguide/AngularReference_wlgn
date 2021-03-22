import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginCredentialsComponent } from './login-credentials.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GlobalDataLayerModule } from '@fedex/global-data-layer-client';
const routes: Routes = [
  { path: '', component: LoginCredentialsComponent }
];

@NgModule({
  declarations: [
    LoginCredentialsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    GlobalDataLayerModule
  ],
  exports: [
    LoginCredentialsComponent
  ]
})
export class LoginCredentialsModule { }
