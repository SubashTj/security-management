import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { clearSessionData, destroyToken, hasToken, saveToken } from 'src/app/core/helpers/token.helper';
import { ApiService } from 'src/app/core/service/api.service';
import { Session } from '../Model/session.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private currentUserSubject = new BehaviorSubject<Session>({} as Session);

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  portalType = '';

  constructor(private apiService: ApiService) {
    this.isAuthenticatedSubject.next(hasToken());
    this.currentUserSubject.next(this.getSessionUser());
  }

  get isLoggedIn() {
    return this.isAuthenticatedSubject.asObservable();
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
  getPortalType() { }

  goToLogin() { }
  signin(post): Observable<Session> {
    return this.apiService.posts(`login`, post).pipe(map(response => (response)));
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
  resetPassword(post): Observable<Session> {
    return this.apiService.posts(`change-password`, post).pipe(map(response => (response)));
  }
  confirmPassword(obj): Observable<Session> {
    return this.apiService.forgot(`forgot-password`, obj).pipe(map(response => (response)));
  }
  newPassword(obj): Observable<Session> {
    return this.apiService.forgotpass(`reset-password`, obj).pipe(map(response => (response)));
  }

}
