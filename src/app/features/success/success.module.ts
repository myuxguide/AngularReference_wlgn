import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SuccessComponent } from './success.component';



const routes: Routes = [
  {path: '', component: SuccessComponent}
];

@NgModule({
  declarations: [
    SuccessComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    SuccessComponent
  ]
})
export class SuccessModule { }
