//@Packages
import { Component, OnInit } from '@angular/core';

//@Services
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this._auth.logout();
  }
}
