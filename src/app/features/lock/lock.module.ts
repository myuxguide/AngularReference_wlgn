import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LockComponent } from './lock.component';
import { GlobalDataLayerModule } from '@fedex/global-data-layer-client';

const routes: Routes = [
  { path: '', component: LockComponent }
];

@NgModule({
  declarations: [LockComponent],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
    GlobalDataLayerModule
  ]
})
export class LockModule { }
