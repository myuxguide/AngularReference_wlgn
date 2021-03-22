import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private router: Router, private sharedService: SharedService) { }

  canActivate(): boolean {
    if (this.sharedService.isNavigatingToLoginScreen) {
      this.router.navigate(['/login-credentials']);
      return false;
    }
    return true;
  }

}
