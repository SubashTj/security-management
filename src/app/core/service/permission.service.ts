
import { Injectable } from '@angular/core';
import { IChildItem, MenuItem } from "../models/navigation.model";
import { PORTALTYPE } from "../helpers/enum.helper";
import { decodedToken } from '../helpers/token.helper';
import { get } from "lodash";
import { MenuList ,UserList} from '../models/menu.model';
import { ConfigService } from './congif.service';

@Injectable({
    providedIn: 'root'
})

export class PermissionService {

    menuSortList: MenuItem[] = [];
    permissions: Object;
    portalType: string = '';
    constructor(private config:ConfigService) {
        this.config.init();
        this.portalType=config.portalType
    }
    isModuleHasAction(permList: Object, moduleList: Array<any>): boolean {
        let admits = moduleList.filter(value => {
            if (permList.hasOwnProperty(value)) {
                return this.getValueByKey(permList, value).length > 0;
            }
        });
        return admits.length > 0;
    }

    isActionFound(permList: Object, moduleList: Array<any>, searchList: Array<any>): boolean {
        let admits = moduleList.filter(value => {
            if (permList.hasOwnProperty(value)) {
                let moduleActions = this.getValueByKey(permList, value);
                let permittedAction = moduleActions.filter(maction => {
                    return searchList.indexOf(maction) !== -1;
                });
                return permittedAction.length > 0;
            }
        });
        return admits.length > 0;
    }

    // init( portalType: string, permissions: Object) {
    //     this.portalType = portalType;
    //     this.permissions = Object.keys(permissions).length > 0 ? permissions : {};
    // }

    init() {
        const token = decodedToken();
        this.portalType = get(token, 'portalType') ? get(token, 'portalType') : '';
        this.permissions = get(token, 'permission') ?? {};
    }
    get authMenu(): MenuItem[] {
        if (( this.portalType == PORTALTYPE.CUSTOMER) || this.portalType == PORTALTYPE.USER) {
            return this.menu;
        }
        let menu: MenuItem[] = [];
        this.menuSortList = this.menu;
        menu = this.menuSortList.filter(data => {
            return data
        });
        return menu.map(x => {
            if (x?.sub) { x.sub = this.getAuthSubmMenu(x.sub); }
            return x;
        });
    }

    getAuthSubmMenu(ichild: IChildItem[]): IChildItem[] {
        let childMenu: IChildItem[] = [];
        childMenu = ichild.filter((data) => {
            return data;
        });
        return childMenu.map((x) => {
            if (x?.sub) {
                x.sub = this.getAuthChildSubMenu(x.sub);
            }
            return x;
        });
    }

    getAuthChildSubMenu(ichild: IChildItem[]): IChildItem[] {
        return ichild.filter((data) => {
            return data;
        });
    }

    get menu(): MenuItem[] {
        let menuList: MenuItem[] = [];
        if(this.portalType==PORTALTYPE.CUSTOMER){
            menuList = MenuList;
        }else if(this.portalType==PORTALTYPE.USER){
            menuList = UserList;
        }
         
        
        return menuList;
    }

    getValueByKey(object: Object, searchKey: string): Array<any> {
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                if (key === searchKey) {
                    return object[key] as Array<any>;
                }
            }
        }
        return [];
    }

}







