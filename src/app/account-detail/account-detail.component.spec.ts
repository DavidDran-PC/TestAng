import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountDetailComponent } from './account-detail.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AccountService } from '../account/account.service';

describe('AccountDetailComponent', () => {
  let component: AccountDetailComponent;
  let fixture: ComponentFixture<AccountDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [AccountDetailComponent],
      providers: [
        AccountService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //--------------------------------------------------------------------
  // Check if created
  //--------------------------------------------------------------------
  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  //--------------------------------------------------------------------
  // Check if h2 created
  //--------------------------------------------------------------------
  it('should render title in a h2 tag with Purchase Detail', inject([HttpTestingController, AccountService],
    (httpMock: HttpTestingController, apiService: AccountService) => {
      const fixture = TestBed.createComponent(AccountDetailComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h2').textContent).toContain('Purchase Detail');
    }));
});
