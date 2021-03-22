import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SendOtpService } from './send-otp.service';
import { HttpErrorResponse } from '@angular/common/http';
import { APIResponse } from '../../shared/models/Response';


describe('SendOtpService', () => {

    let httpTestingController: HttpTestingController;
    let service: SendOtpService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                SendOtpService
            ],
        });
        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(SendOtpService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    /* Test case covers sendVerificationCode method for true case*/
    it('should validate sendVerificationCode method success call', () => {
        const otpData = {
            UUID: '7zqesGMub0',
            sessionId: 'KKKDFJ332kdfkj',
            verificationMethods: [{
              deliveryMethod: 'CALL'
            }]
        };
        const mockResp: APIResponse = {
            output: {
                maxLimit: true
            }
        };
        service.sendVerificationCode(otpData).subscribe((resp: APIResponse) => {
            expect(resp).not.toBe(null);
            expect(JSON.stringify(resp)).toEqual(JSON.stringify(mockResp));
        });

        const req = httpTestingController.expectOne('/user/v2/password/pin');
        expect(req.request.method).toEqual('POST');
        req.flush(mockResp);
    });


    /* Test case to handle 500 server error */
    it('should throw error 500', () => {
        const emsg = 'deliberate 500 error';
        const otpData = {
            UUID: '7zqesGMub0',
            sessionId: 'KKKDFJ332kdfkj',
            verificationMethods: [{
            deliveryMethod: 'CALL'
          }]
        };
        service.sendVerificationCode(otpData).subscribe(data => {
            fail('should have failed with the 500 error');
        }, (error: HttpErrorResponse) => {
            expect(error).toBeTruthy();
        });
        const req = httpTestingController.expectOne('/user/v2/password/pin');
        req.flush(emsg, { status: 500, statusText: 'Not Found' });
    });


    /* Test case to handle 400 Bad Request */
    it('should throw error 400', () => {
    const errormsg = {
        'errors': [
            {
                'code': 'ATTEMPT.EXCEEDED',
                'parameterList' : [],
                'message': 'PIN attempt exceeded'
            }
        ]
    };
    const otpData = {
        UUID: '7zqesGMub0',
        sessionId: 'KKKDFJ332kdfkj',
        deliverymethod: 'phone'
    };
    service.sendVerificationCode(otpData).subscribe(data => {
        fail('should have failed with the 400 error');
    }, (error: string) => {
        expect(error).toBeTruthy();
    });
    const req = httpTestingController.expectOne('/user/v2/password/pin');
    req.flush(errormsg, { status: 400, statusText: 'Bad Request' });
    });
});
