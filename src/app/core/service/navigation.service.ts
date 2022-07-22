import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MenuItem } from "../models/navigation.model";

@Injectable({
  providedIn: "root"
})

export class NavigationService {

  visible: boolean;
  iconMenu: MenuItem[] = [];

  constructor() {
      this.visible = true;
  }

  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle: string = "Frequently Accessed";

  // sets iconMenu as default;
  menuItems = new BehaviorSubject<MenuItem[]>([] as MenuItem[]);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();

  publish(menu: MenuItem[]) {
    this.menuItems.next([]); 
    this.menuItems.next(menu);
  }

  hide() { this.visible = false; }

  show() { this.visible = true; }

}
