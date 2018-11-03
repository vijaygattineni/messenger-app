import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from './login.model';
import { Router } from '@angular/router';

import { qbEndpoints, qbAccount } from '../core/qb.config';
declare var QB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginErrorMessage: string;
  submitted: boolean;
  submissionInProgress: boolean;
  userDetails: any;

  constructor(private router: Router, private fb: FormBuilder) { }

  /**
   * Login form Submission
   *
   * @param loginValue: (Login) login details
   */
  submitForm(loginValue: Login) {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.submissionInProgress = true;
      QB.init(qbAccount.appId, qbAccount.authKey, qbAccount.authSecret, qbEndpoints);
      QB.createSession({ login: loginValue.userid, password: loginValue.password }, (error, response) => {
        if (response) {
          this.loginErrorMessage = '';
          if (response.user_id) {
            console.log('Login Success');
            sessionStorage.setItem('session', JSON.stringify(response));
            sessionStorage.setItem('pass', loginValue.password);
            sessionStorage.setItem('uname', loginValue.userid);
            this.router.navigate(['home']);
          }
        } else {
          console.log('Login Error');
          this.loginErrorMessage = 'Invalid Credentials';
        }
        this.submissionInProgress = false;
      });
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'userid': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

}
