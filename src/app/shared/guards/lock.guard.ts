import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class LockGuard implements CanActivate {

  constructor(private sharedService: SharedService, private router: Router) { }

  canActivate(): boolean {
    /*** -- If flag is false, user should be routed directly to this page ---**/
    if (!this.sharedService.isAccountLocked) {
      if (sessionStorage.getItem('wlgn-lock')) {
        this.sharedService.redirectToFedexHomePage();
      } else {
        if (!this.sharedService.isLockPage) {
          this.sharedService.isLockPage = true;
          this.router.navigate(['/login-credentials']);
        }
        return true;
      }
      return false;
    }
    return true;
  }

}


