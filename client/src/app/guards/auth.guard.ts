import { AuthService } from './../services/auth.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let is_auth: boolean;
    this.authService.isAuth
      .subscribe((result) => {
        is_auth = result;
      })
      .unsubscribe();

    if (!is_auth) {
      this.router.navigate(['auth/login']);
      return false;
    }

    return true;
  }
}
