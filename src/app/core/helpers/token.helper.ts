
import { JwtHelperService } from "@auth0/angular-jwt";
const helper = new JwtHelperService();

export function hasToken() {
  return !!getToken();
}

export function getToken(): String {
  return window.localStorage['TGJWTTOKEN'];
}

export function saveToken(token: String) {
  window.localStorage['TGJWTTOKEN'] = token;
}

export function destroyToken() {
  window.localStorage.removeItem('TGJWTTOKEN');
}

export function decodedToken() {
  var myRawToken = getToken() ?? '';
  return helper.decodeToken(String(myRawToken));
}

export function isTokenExpired(): boolean {
  const myRawToken = getToken().toString();
  return helper.isTokenExpired(myRawToken);
}


export function tokenExpirationDate(): Date {
  const myRawToken = getToken().toString();
  return helper.getTokenExpirationDate(myRawToken);
}

export function clearSessionData(){
  window.localStorage.setItem('sesUsr', JSON.stringify({}));
    window.localStorage.setItem('TGLANG', '');
    window.localStorage.setItem('TGDATEFORMAT', '');
    window.localStorage.setItem('TGDATERAW', '');
    window.localStorage.setItem('TGDATESEP', '');
    window.localStorage.setItem('TGTIMEFORMAT', '');
    window.localStorage.setItem('TGTHEME', '');
    window.localStorage.setItem('TGFONT', '');
    window.localStorage.setItem('STUDENTID', '');
    window.localStorage.setItem('ACADEMICYEARID', '');
    window.localStorage.setItem('BATCHID', '');
    window.localStorage.setItem('ACADEMICNAME', '');
    window.localStorage.setItem('BATCHNAME', '');
    window.localStorage.setItem('ISOTPVERIFIED', '');
}