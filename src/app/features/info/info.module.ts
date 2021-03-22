import { NgModule } from '@angular/core';
import { InfoComponent } from './info.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {CommonModule} from '@angular/common';

const routes: Routes = [
  {path: '', component: InfoComponent}
];

@NgModule({
  declarations: [InfoComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [InfoComponent]
})
export class InfoModule { }
