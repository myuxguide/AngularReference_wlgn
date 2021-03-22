import { TestBed } from '@angular/core/testing';
import { APIResponse } from '../../shared/models/Response';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginCredentialService } from './login-credential.service';

// Creating a test suite for LoginCredential Service
describe('LoginCredentialService', () => {

    let httpTestingController: HttpTestingController;
    let loginCredentialService: LoginCredentialService;

    // Importing and initialising of components and services
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        httpTestingController = TestBed.inject(HttpTestingController);
        loginCredentialService = TestBed.inject(LoginCredentialService);
    });

    // Check whether the service is created
    it('should be created', () => {
        expect(loginCredentialService).toBeTruthy();
    });

    // Check wheteher the password is sent on success case
    it('should send password on success call', () => {
        const userParams = {
            userName: '3927411',
            password: 'Test1234'
        };
        const mockResp: APIResponse = {
            transactionId: 'cc6f3777-fe6a-42d5-b3a7-1a28874455c0',
            output: {
                    fclCookie: '10027.9d91.40d0134c6316807047c32b21ff445c56',
                    nameCookie: 'pragati',
                    contactNameCookie: 'pragati gunnam',
                    uuidCookie: 'bYxpFoKi6t'
            }
        };
        loginCredentialService.validateLogin(userParams).subscribe((resp: APIResponse) => {
            expect(resp).not.toBe(null);
            expect(JSON.stringify(resp)).toEqual(JSON.stringify(mockResp));
        });
        const req = httpTestingController.expectOne('/user/v2/login/validate');
        expect(req.request.method).toEqual('POST');
    });

    // On click test link check validateLogin success response
    it('validate user and get user and verification details in response', () => {
        const userParams = {
            userName: 'shubham',
            password: 'password',
            deviceId: 'staticone'
        };
        const mockResp: APIResponse = {
            output: {
                sessionId: 'KKD342FJ',
                twoFAEnabled: true,
                trustDevice: true,
                fclCookie: 'Afs4354',
                contactNameCookie: 'Shubham Bhairappa',
                nameCookie: 'Shubham',
                uuidCookie: '453dfsfff',
                verificationMethods: [
                    {
                        deliveryMethod: 'phone',
                        address: '###-###-234',
                        primary: true
                    },
                    {
                        deliveryMethod: 'sms',
                        address: '###-###-234',
                        primary: false
                    },
                    {
                        deliveryMethod: 'email',
                        address: 's###@###.com',
                        primary: true
                    }
                ]
            }
        };
        loginCredentialService.newValidateLogin(userParams).subscribe((resp: APIResponse) => {
            expect(resp).not.toBe(null);
            expect(JSON.stringify(resp)).toEqual(JSON.stringify(mockResp));
        });
        const req = httpTestingController.expectOne('/user/v2/login/validateLogin');
        expect(req.request.method).toEqual('POST');
    });
});
