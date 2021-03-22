import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FailComponent } from './fail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GlobalDataLayerModule } from '@fedex/global-data-layer-client';



const routes: Routes = [
  { path: '', component: FailComponent }
];

@NgModule({
  declarations: [
    FailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    GlobalDataLayerModule
  ],
  exports: [
    FailComponent
  ]
})
export class FailModule { }
