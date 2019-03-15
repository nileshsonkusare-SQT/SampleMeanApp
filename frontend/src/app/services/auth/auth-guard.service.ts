//@Packages
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

//@Services
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private _auth: AuthService,
    public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
      //const url = route.routeConfig.path;
      if (!this._auth.isAuthenticated()) {
        this.router.navigate(['']);
        return false;
      }
      return true;
    }
}
