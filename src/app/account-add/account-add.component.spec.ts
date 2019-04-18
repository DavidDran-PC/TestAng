import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountAddComponent } from './account-add.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AccountService } from '../account/account.service';
import { FormsModule } from '@angular/forms';

describe('AccountAddComponent', () => {
  let component: AccountAddComponent;
  let fixture: ComponentFixture<AccountAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [AccountAddComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAddComponent);
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
  it('should render title in a h2 tag with Add A Purchase', inject([HttpTestingController, AccountService],
    (httpMock: HttpTestingController, apiService: AccountService) => {
      const fixture = TestBed.createComponent(AccountAddComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h2').textContent).toContain('Add A Purchase');
    }));
});
