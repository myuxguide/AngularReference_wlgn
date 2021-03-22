import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HttpClientTestingModule } from '../../../../node_modules/@angular/common/http/testing';
import { SharedService } from '../services/shared.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let sharedService: SharedService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthGuard,
        { provide: Router, useValue: { navigate: () => null } }
      ]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    sharedService = TestBed.inject(SharedService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  // Test Case for able to activate when logged out
  it('should not be able to activate when logged out', () => {
    sharedService.isNavigatingToLoginScreen = true;
    const res = guard.canActivate();
    expect(res).toBeFalsy();
  });


  // Test Case for able to activate when logged in
  it('should be able to activate when logged in', () => {
    sharedService.isNavigatingToLoginScreen = false;
    const res = guard.canActivate();
    expect(res).toBeTruthy();
  });

});
