import { TestBed } from '@angular/core/testing';
import { DecoupleGuard } from './decouple.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigurationService } from '../../services/configuration/configuration.service';

describe('DecoupleGuard', () => {
  let guard: DecoupleGuard;
  let configService: ConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        DecoupleGuard, ConfigurationService
      ]
    });
    guard = TestBed.inject(DecoupleGuard);
    configService = TestBed.inject(ConfigurationService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  // Testcase to Check for decouple disabled case
  it('Check for decouple disabled case', () => {
    configService.appConfig.decoupleFlag = true;
    expect(guard.canActivate()).toEqual(true);
  });

  // Testcase to Check for decouple eanbled case
  it('Check for decouple eanbled case', () => {
    configService.appConfig.decoupleFlag = false;
    expect(guard.canActivate()).toEqual(false);
  });
});
