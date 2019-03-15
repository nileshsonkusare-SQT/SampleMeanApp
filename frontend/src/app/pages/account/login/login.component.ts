//@Packages
import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//@Services
import { AuthService } from '../../../services/auth/auth.service';
import { CommonService } from 'src/app/services/common.service';

//@Models
import { UserVM } from '../../../models/UserVM';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy  {

  loginForm: FormGroup;
  submitted = false;

  userModal = new UserVM();

  constructor(public router: Router,
    private _renderer: Renderer2,
    private _formBuilder: FormBuilder,
    private _auth: AuthService,
    private _commonService: CommonService,
     ) {
      this._renderer.addClass(document.body, 'login-page');
    }

  ngOnInit() {
    this.buildForm();
  }

  ngOnDestroy() {
    this._renderer.removeClass(document.body, 'login-page');
  }

  buildForm() {
    this.loginForm = this._formBuilder.group({
      email: [this.userModal.email, [Validators.required, Validators.email]],
      password: [this.userModal.password, Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login() {
    let self = this;
    self.submitted = true;

    // stop here if form is invalid
    if (self.loginForm.invalid) {
      return;
    }

    console.log(self.loginForm.value);

    self._commonService.showLoader();
    self._auth.login(self.loginForm.value).subscribe(data => {
      self._commonService.hideLoader();

      if (!self._commonService.isNullOrEmpty(data)) {
        let response: any = data;
        if (response.success) {
          
          //Store session details.
          self._auth.setSession(response);
          
          //Go to Dashboard page.
          this.router.navigate(['/dashboard']);
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
