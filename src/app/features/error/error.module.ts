import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GlobalDataLayerModule } from '@fedex/global-data-layer-client';

const routes: Routes = [
  { path: '', component: ErrorComponent }
];

@NgModule({
  declarations: [ErrorComponent],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
    GlobalDataLayerModule
  ]
})
export class ErrorModule { }
