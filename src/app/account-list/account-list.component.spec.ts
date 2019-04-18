import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountListComponent } from './account-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AccountService } from '../account/account.service';

describe('AccountListComponent', () => {
  let component: AccountListComponent;
  let fixture: ComponentFixture<AccountListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [AccountListComponent],
      providers: [
        AccountService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //--------------------------------------------------------------------
  // Check if created
  //--------------------------------------------------------------------
  it('should be created', inject([HttpTestingController, AccountService],
    (httpMock: HttpTestingController, apiService: AccountService) => {
      expect(component).toBeTruthy();
    }));

  //--------------------------------------------------------------------
  // Check if h2 created
  //--------------------------------------------------------------------
  it('should render title in a h2 tag with Purchase List', inject([HttpTestingController, AccountService],
    (httpMock: HttpTestingController, apiService: AccountService) => {
      const fixture = TestBed.createComponent(AccountListComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h2').textContent).toContain('Purchase List');
    }));
});
