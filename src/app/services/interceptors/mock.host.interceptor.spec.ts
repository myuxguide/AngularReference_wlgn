import {MockHostInterceptor} from './mock.host.interceptor';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {ConfigurationService} from '../configuration/configuration.service';

describe('MockHostInterceptor', () => {
  let interceptor: MockHostInterceptor;
  let configService: ConfigurationService;

  beforeAll(() => {
    configService = new ConfigurationService(null);
    configService.appConfig = { ...require('../../../assets/configs/config.json'), ...require('../../../assets/configs/level.json') };
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [MockHostInterceptor,
        {provide: ConfigurationService, useValue: configService}]
    }).compileComponents();

    interceptor = TestBed.inject(MockHostInterceptor);
  });

  it('should create', () => {
    expect(interceptor).toBeDefined();
  });

  it('should check the mock for true', () => {
    let mockVal = interceptor.toBoolean(true);
    expect(mockVal).toBe(true);
    mockVal = interceptor.toBoolean('true');
    expect(mockVal).toBe(true);
    mockVal = interceptor.toBoolean(1);
    expect(mockVal).toBe(true);
    mockVal = interceptor.toBoolean('on');
    expect(mockVal).toBe(true);
  });

  it('should check the mock for false', () => {
    let mockVal = interceptor.toBoolean(false);
    expect(mockVal).toBe(false);
    mockVal = interceptor.toBoolean('false');
    expect(mockVal).toBe(false);
    mockVal = interceptor.toBoolean(0);
    expect(mockVal).toBe(false);
    mockVal = interceptor.toBoolean('off');
    expect(mockVal).toBe(false);
    mockVal = interceptor.toBoolean(null);
    expect(mockVal).toBe(false);
  });

  it('should get the mock value (false)', () => {
    configService.appConfig = {...configService.appConfig, ...{env: {mock: false}}};
    const mockVal = interceptor.isMock;
    expect(mockVal).toBe(false);
  });

  it('should get the mock value (true)', () => {
    configService.appConfig = {...configService.appConfig, ...{env: {mock: true}}};
    const mockVal = interceptor.isMock;
    expect(mockVal).toBe(true);

    const isMockCacheValue = interceptor.isMock;
    expect(isMockCacheValue).toBe(true);
  });

  it('should get the mock value from queryParams', () => {
    let mockVal = interceptor.findQueryParam('mock', 'https://test.fedex.com/test?mock=on');
    let mockBoolean = interceptor.toBoolean(mockVal);
    expect(mockBoolean).toBe(true);

    mockVal = interceptor.findQueryParam(null);
    mockBoolean = interceptor.toBoolean(mockVal);
    expect(mockBoolean).toBe(false);
  });
});
