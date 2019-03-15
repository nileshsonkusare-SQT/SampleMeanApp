//@Packages
import { Component } from '@angular/core';

//@Services
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mean App';

  isLoggedIn: boolean = false;

  constructor(private _auth: AuthService) {
    console.log("App Component Called");

    if (this._auth.isAuthenticated()) {
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
  }
}
