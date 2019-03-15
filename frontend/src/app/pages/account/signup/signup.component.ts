//@Packages
import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//@Services
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { AccountService } from 'src/app/services/account.service';

// import custom validator to validate that password and retype password fields match
import { MustMatch } from 'src/app/shared/_helpers/must-match.validator';

//@Models
import { UserVM } from '../../../models/UserVM';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  signupForm: FormGroup;
  submitted = false;
  retypePassword: string;

  userModal = new UserVM();

  constructor(public router: Router,
    private _renderer: Renderer2,
    private _formBuilder: FormBuilder,
    private _auth: AuthService,
    private _commonService: CommonService,
    private _accountService: AccountService
  ) {
    this._renderer.addClass(document.body, 'register-page');
  }

  ngOnInit() {
    this.buildForm();
  }

  ngOnDestroy() {
    this._renderer.removeClass(document.body, 'register-page');
  }

  buildForm() {
    this.signupForm = this._formBuilder.group({
      name: [this.userModal.name, Validators.required],
      email: [this.userModal.email, [Validators.required, Validators.email]],
      password: [this.userModal.password, Validators.required],
      retypepassword: [this.retypePassword, Validators.required]
    },
    {
      validator: MustMatch('password', 'retypepassword')
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  signup() {
    let self = this;
    self.submitted = true;

    // stop here if form is invalid
    if (self.signupForm.invalid) {
      return;
    }

    console.log(self.signupForm.value);

    self._commonService.showLoader();
    self._accountService.signup(self.signupForm.value).subscribe(data => {
      self._commonService.hideLoader();

      if (!self._commonService.isNullOrEmpty(data)) {
        let response: any = data;
        if (response.success) {
          self._commonService.showToaster("You have registered successfully.", "success");

          //Go to Login page.
          this.router.navigate(['/login']);
        } else {
          if (typeof response.message === 'object') {
            self._commonService.showToaster(JSON.stringify(response.message), "error");
          } else {
            self._commonService.showToaster(response.message, "error");
          }
        }
      }
    }, error => {
      self._commonService.hideLoader();
      self._commonService.showToaster(error.message, "error");
    });

  }

}
