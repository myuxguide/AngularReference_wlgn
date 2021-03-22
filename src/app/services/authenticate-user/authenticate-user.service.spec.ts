import { TestBed } from '@angular/core/testing';
import { APIResponse } from '../../shared/models/Response';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticateUserService } from './authenticate-user.service';

describe('AuthenticateUserService', () => {
  let service: AuthenticateUserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthenticateUserService);
  });

  // Check whether the service is created
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Check expired pin case
  it('Pin expired response', () => {
    const verifyOtpRequest = {
      UUID: 'YYq5TN9Qe2',
      sessionId: 'KKD342FJ',
      otp: '111111',
      trustdeviceId: false
    };
    const mockResp: any = {
      status: '400',
      jsonBody: {
        transactionId: '413e375c-160e-4d7d-929f-0da72a54ac6f',
        errors: [{
          code: 'PIN.Expired',
          message: 'PIN got expired',
          parameterList: [],
        }],
      }
    };
    service.verifyOtp(verifyOtpRequest).subscribe((resp: APIResponse) => {
      expect(resp).not.toBe(null);
      expect(JSON.stringify(resp)).toEqual(JSON.stringify(mockResp));
    });
    const req = httpTestingController.expectOne('/user/v1/login/pin/validate');
    expect(req.request.method).toEqual('POST');
  });

  // Check incorrect pin case
  it('Pin incorrect response', () => {
    const verifyOtpRequest = {
      UUID: 'dc8tyHQxlX',
      sessionId: 'KKD342FJ',
      otp: '111111',
      trustdeviceId: false
    };
    const mockResp: any = {
      status: '400',
      jsonBody: {
        transactionId: '413e375c-160e-4d7d-929f-0da72a54ac6f',
        errors: [{
          code: 'PIN.Incorrect',
          message: 'PIN is incorrect',
          parameterList: [],
        }],
      }
    };
    service.verifyOtp(verifyOtpRequest).subscribe((resp: APIResponse) => {
      expect(resp).not.toBe(null);
      expect(JSON.stringify(resp)).toEqual(JSON.stringify(mockResp));
    });
    const req = httpTestingController.expectOne('/user/v1/login/pin/validate');
    expect(req.request.method).toEqual('POST');
  });


  // Authenticate user API success response
  it('validate authenticate user details in response', () => {
    const verifyOtpRequest = {
      UUID: 'LlXgT5Dz1i',
      sessionId: 'KKD342FJ',
      otp: '111111',
      trustdeviceId: false
    };

    const mockResp: any = {
      status: '200',
      jsonBody: {
        transactionId: 'cc6f3777-fe6a-42d5-b3a7-1a28874455c0',
        output: {
          message: 'success'
        }
      }
    };
    service.verifyOtp(verifyOtpRequest).subscribe((resp: APIResponse) => {
      expect(resp).not.toBe(null);
      expect(JSON.stringify(resp)).toEqual(JSON.stringify(mockResp));
    });
    const req = httpTestingController.expectOne('/user/v1/login/pin/validate');
    expect(req.request.method).toEqual('POST');
  });
});
