import { Injectable } from '@angular/core';
import { CanActivate, Router, NavigationStart } from '@angular/router';
import { get } from 'lodash';
import { decodedToken } from '../helpers/token.helper';

@Injectable()
export class VerifyGuard implements CanActivate {

    constructor(private router: Router) { 
        
    }

    canActivate() {
        const getToken = window.localStorage.getItem('TGJWTTOKEN');
        let checkOTP = localStorage.getItem('ISOTPVERIFIED') ? true : false;
        const token = decodedToken();
        let portalType = get(token, 'type') ? get(token, 'type') : '';
        if (getToken && checkOTP) {
            this.router.navigate(['/dashboard']);
            return false;
        }
        else {
            return true;
        }
        }
    
}
