import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { clearSessionData, destroyToken, hasToken, saveToken } from 'src/app/core/helpers/token.helper';
import { ApiService } from 'src/app/core/service/api.service';
import { Session } from 'src/app/Modules/session/Model/session.model';
import { PORTALTYPE } from '../helpers/enum.helper';
import { IUserAPI } from '../user/api.model';
import { User } from '../user/user.model';



@Injectable({
    providedIn: 'root'
  })
  export class UserService {
    private currentUserSubject = new BehaviorSubject<Session>({} as Session);
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    portalType = '';
  
    constructor(private router:Router,private apiService : ApiService) {
      this.isAuthenticatedSubject.next(hasToken());
      this.currentUserSubject.next(this.getSessionUser());
     }
     
    get isLoggedIn() {
      return this.isAuthenticatedSubject.asObservable();
    }
    getCurrentUser(): User {
        return JSON.parse(window.localStorage.getItem('sesUsr'));
      }
    
    logout() {
      this.getPortalType();
      this.purgeAuth();
      this.goToLogin();
    }
    purgeAuth() {
      destroyToken();
      clearSessionData();
      this.currentUserSubject.next({} as Session);
      this.isAuthenticatedSubject.next(false);
  
    }
    getPortalType() {}
    
    goToLogin() {
      if (this.portalType == PORTALTYPE.CUSTOMER) {
        this.router.navigate(['/']);
      } else if (this.portalType == PORTALTYPE.HOSPITAL) {
        this.router.navigate(['/']);
      } else if (this.portalType == PORTALTYPE.TEACHER) {
        this.router.navigate(['/']);
      } else if (this.portalType == PORTALTYPE.USER) {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/']); //default
      }
    }
    signin(post): Observable<Session> {
      return this.apiService.posts(`employee/user`, post).pipe(map(response => (response)));
    }
    signOut(obj){
      return this.apiService.posts(`employee/log-out`,obj).pipe(map(response => (response)));
    }
    setAuth(user: Session) {
      saveToken(user.token);
      window.localStorage.setItem('sesUsr', JSON.stringify(user));
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
    getSessionUser(): Session {
      return JSON.parse(window.localStorage.getItem('sesUsr'));
    }
    otpVerify(obj): Observable<IUserAPI> {
      return this.apiService.get('mobilenumbers/otp/'+obj.mobileNumber).pipe(map(response =>(response)));
    }
    verifyOtp(obj): Observable<IUserAPI> {
      return this.apiService.post(`mobilenumbers/verifyotp`,obj).pipe(map(response =>(response)));
    }
  }