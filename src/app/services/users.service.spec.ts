import { TestBed } from '@angular/core/testing';
import { APIResponse } from '../shared/models/Response';
import { UsersService } from './users.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('UsersService', () => {

  let httpTestingController: HttpTestingController;
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // To check Login API Response
  it('validate user and get user and verification details in response', () => {
    const mockResp: APIResponse = {
      'transactionId': 'cc6f3777-fe6a-42d5-b3a7-1a28874455c0',
      'output': {
        'userLoggedIn': false
      }
    };
    service.userLoggedInState().subscribe((resp: APIResponse) => {
      expect(resp).not.toBe(null);
      expect(JSON.stringify(resp)).toEqual(JSON.stringify(mockResp));
    });
    const req = httpTestingController.expectOne('/user/v2/login');
    expect(req.request.method).toEqual('GET');
  });
});
