import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SharedService } from '../services/shared.service';
import { LockGuard } from './lock.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';
import { Router } from '@angular/router';


describe('LockGuard', () => {
  let guard: LockGuard;
  let sharedService: SharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        LockGuard, ConfigurationService, SharedService,
        { provide: Router, useValue: { navigate: () => null } }
      ]
    });
    guard = TestBed.inject(LockGuard);
    sharedService = TestBed.inject(SharedService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  // Test case to check guard retun true if there is no refresh activity happened on lock screen
  it('check guard retun true if there is no refresh activity happened on lock screen', () => {
    sharedService.isAccountLocked = true;
    expect(guard.canActivate()).toEqual(true);
  });

  // Testcase to check gaurd retun false if refresh has done from lock screen
  it('Check guard return false if refresh has done from lock screen ', () => {
    sessionStorage.setItem('wlgn-lock', 'true');
    spyOn(sharedService, 'redirectToFedexHomePage');
    sharedService.redirectToFedexHomePage();
    sharedService.isAccountLocked = false;
    expect(guard.canActivate()).toEqual(false);
  });

  it('Check guard return true if bookmark has done from lock screen ', () => {
    sessionStorage.removeItem('wlgn-lock');
    sharedService.isLockPage = false;
    sharedService.isAccountLocked = false;
    expect(guard.canActivate()).toEqual(true);
  });

});
