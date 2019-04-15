import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AccountService } from './account.service';

describe('AccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AccountService,
      ]
  }));

  it('should be created', (inject([HttpTestingController, AccountService],
    (httpClient: HttpTestingController, apiService: AccountService) => {
    const service: AccountService = TestBed.get(AccountService);
    expect(service).toBeTruthy();
  })));
});
