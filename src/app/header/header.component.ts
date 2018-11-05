import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router) { }

  logout() {
    sessionStorage.removeItem('session');
    sessionStorage.removeItem('pass');
    sessionStorage.removeItem('uname');
    this.router.navigate(['login']);
  }
  ngOnInit() {
  }

}
