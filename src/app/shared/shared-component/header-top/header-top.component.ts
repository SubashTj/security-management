import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { decodedToken } from 'src/app/core/helpers/token.helper';
import { LayoutService } from 'src/app/core/service/layout.service';
import { NavigationService } from 'src/app/core/service/navigation.service';
import { get } from "lodash";
import { Router } from '@angular/router';
import { PORTALTYPE } from 'src/app/core/helpers/enum.helper';
import { UserService } from 'src/app/core/service/user.service';
import { MatSidenav } from '@angular/material/sidenav';
import { ConfigService } from 'src/app/core/service/congif.service';
@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.scss']
})
export class HeaderTopComponent implements OnInit {
  layoutConf: any;
  currentLang: '';
  menuItems: any;
  menuItemSub: Subscription;
  availableLangs = [];
  @Input() notificPanel;
  @Input() messagePanel;
  fontFamily: string;
  portalType: string = '';
  userType: string = '';
  checkType: any = PORTALTYPE;
  users = [];
  currentUser = '';
  userProfile;
  teacherProfile: any;
  academicId: string;
  batchId = '';
  queueCount = 0;
  limit: any;
  @Input() sidenav: MatSidenav
  customerId: string;
  districtId: string;
  mail: any;
  password: any;
  constructor(private router: Router, public navService: NavigationService, private layout: LayoutService, private userService: UserService, private config: ConfigService) {
    this.customerId = config.customerId;
    this.districtId = config.districtId;
    this.mail = config.mail;
    this.password = config.password;
    this.portalType = config.portalType
    this.autoInit();
  }
  public innerWidth: any;
  @HostListener('window:resize', ['$event'])
  ngOnInit(): void {
    this.layoutConf = this.layout.layoutConf;
    this.menuItemSub = this.navService.menuItems$
      .subscribe(res => {
        res = res.filter(item => item.type !== 'icon' && item.type !== 'separator');
        let limit = 12
        let mainItems: any[] = res.slice(0, limit)
        if (res.length <= limit) {
          return this.menuItems = mainItems
        }
        let subItems: any[] = res.slice(limit, res.length - 1)
        mainItems.push({
          name: 'More',
          type: 'dropDown',
          tooltip: 'More',
          icon: 'more_horiz',
          sub: subItems
        })
        this.menuItems = mainItems
      })
  }
  autoInit() {
    const token = decodedToken();
    // this.portalType = get(token, 'type') ?? '';
    this.userType = get(token, 'user_type') ?? '';
  }
  Signout(portalType) {
    if (this.portalType == PORTALTYPE.CUSTOMER) {
      let obj = {
        "customerId": this.customerId,
        "districtId": this.districtId,
        "mail": this.mail,
        "password": this.password,
      }
      this.userService.signOut(obj).subscribe((data) => {
        if (data.statusCode == 200) {
          this.userService.logout();
        }
        else {

        }
      })

    } else if (this.portalType == PORTALTYPE.HOSPITAL) {

      this.userService.logout();
    } else {
      this.userService.logout();
    }
  }
  forgot() {
    this.router.navigate(['/reset'])
  }
  toggleSidenav() {
    if (this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      })
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    })
  }

  ngOnDestroy() {
    this.menuItemSub.unsubscribe()
  }
  onResize(event) {
    this.innerWidth = window.innerWidth;
    console.log("screen size", this.innerWidth);
    this.menuItemSub = this.navService.menuItems$.subscribe((res) => {
      res = res.filter(
        (item) => item.type !== "icon" && item.type !== "separator"
      );
      if (window.matchMedia(`(max-width: 1251px) and (min-width: 1100px)`).matches) {
        this.limit = 5;
      } else if (window.matchMedia(`(max-width: 1099px)`).matches) {
        this.limit = 4;
      } else if (window.matchMedia(`(max-width: 1367px) and (min-width: 1250px)`).matches) {
        this.limit = 7;
      } else if (window.matchMedia(`(max-width: 1500px) and (min-width: 1367px)`).matches) {
        this.limit = 11;
      } else {
        this.limit = 11;
      }
      let mainItems: any[] = res.slice(0, this.limit);
      console.log(res.length <= this.limit, res.length, this.limit);
      if (res.length <= this.limit) {
        return (this.menuItems = mainItems);
      }
      let subItems: any[] = res.slice(this.limit, res.length);
      mainItems.push({
        name: "More",
        type: "dropDown",
        tooltip: "More",
        icon: "more_horiz",
        sub: subItems,
      });
      this.menuItems = mainItems;
    });
  }

}
