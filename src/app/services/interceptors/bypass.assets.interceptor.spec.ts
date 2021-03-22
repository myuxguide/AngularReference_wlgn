import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {BypassAssetsInterceptor} from './bypass.assets.interceptor';

describe('ByPassAssetsInterceptor', () => {
  let interceptor: BypassAssetsInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [ BypassAssetsInterceptor ]
    }).compileComponents();
    interceptor = TestBed.inject(BypassAssetsInterceptor);
  });

  it('should create', () => {
    expect(interceptor).toBeDefined();
  });
});
