import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class DecoupleGuard implements CanActivate {

  constructor(private config: ConfigurationService) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.config.appConfig.decoupleFlag) {
      return true;
    }
    return false;
  }

}
