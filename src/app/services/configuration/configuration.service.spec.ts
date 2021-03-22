import {ConfigurationService} from './configuration.service';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ConfigurationService', () => {

  let service: ConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();
  });

  beforeEach( () => {
    service = TestBed.inject(ConfigurationService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should have defined appConfig', () => {
    service.initConfigs();
    expect(service.appConfig).toBeDefined();
  });

  it('should merge all configs together', () => {
    const configs = [{key1: 'key1Value', key2: {key: 'value'}}, {key3: 'key3Value'}];
    service.withConfig(configs);
    expect(service.appConfig).toBeDefined();
    const config = service.config;
    expect(config).toEqual(service.appConfig);
  });

});
