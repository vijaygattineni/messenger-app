import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginAccountService {

  constructor(private router: Router) { }

  canActivate(): boolean {
    if (this.isLoggedIn()) {
      this.router.navigate(['home']);
      return false;
    } else {
      return true;
    }
  }

  isLoggedIn() {
    if (sessionStorage.getItem('session')) {
      return true;
    } else {
      return false;
    }
  }
}
