import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SessionService } from 'src/app/Modules/session/service/session.service';
import { take, map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this.userService.isLoggedIn.pipe(take(1),                              
        map((isLoggedIn: boolean) => {   
          let checkOTP = localStorage.getItem('ISOTPVERIFIED') ? true : false;
          let canLogin = isLoggedIn && checkOTP;
          if (!canLogin) {
     
            this.userService.logout(); 
            return false;
          }
          return true;
        })
      );



  }
}
