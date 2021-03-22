import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { DecoupleGuard } from './shared/guards/decouple.guard';
import { LockGuard } from './shared/guards/lock.guard';

const routes: Routes = [
  {
    path: 'login-credentials',
    loadChildren: () => import('./features/login-credentials/login-credentials.module').then(m => m.LoginCredentialsModule),
    canActivate: [LockGuard]
  },
  {
    path: 'authenticate',
    loadChildren: () => import('./features/authenticate/authenticate.module').then(m => m.AuthenticateModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'info',
    loadChildren: () => import('./features/info/info.module').then(m => m.InfoModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./features/error/error.module').then(m => m.ErrorModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'success',
    loadChildren: () => import('./features/success/success.module').then(m => m.SuccessModule),
    canActivate: [DecoupleGuard]
  },
  {
    path: 'fail',
    loadChildren: () => import('./features/fail/fail.module').then(m => m.FailModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'lock',
    loadChildren: () => import('./features/lock/lock.module').then(m => m.LockModule),
    canActivate: [LockGuard]
  },
  { path: '', redirectTo: '/login-credentials', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
