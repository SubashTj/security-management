import {
    Directive,
    OnInit,
    OnDestroy,
    HostBinding,
    Input,
    HostListener
  } from "@angular/core";
  import { takeUntil } from "rxjs/operators";
  import { Subject } from "rxjs";
import { MatchMediaService } from "src/app/core/service/match-media.service";
  import { tgssSidenavHelperService } from "./tgss-sidenav-helper.service";
  import { MatSidenav } from "@angular/material/sidenav";
  import { MediaObserver } from "@angular/flex-layout";
  
  @Directive({
    selector: "[tgssSidenavHelper]"
  })
  export class tgssSidenavHelperDirective implements OnInit, OnDestroy {
    @HostBinding("class.is-open")
    isOpen: boolean;
  
    @Input("tgssSidenavHelper")
    id: string;
  
    @Input("isOpen")
    isOpenBreakpoint: string;
  
    private unsubscribeAll: Subject<any>;
  
    constructor(
      private matchMediaService: MatchMediaService,
      private tgssSidenavHelperService: tgssSidenavHelperService,
      private matSidenav: MatSidenav,
      private mediaObserver: MediaObserver
    ) {
      // Set the default value
      this.isOpen = true;
  
      this.unsubscribeAll = new Subject();
    }
  
    ngOnInit(): void {
      this.tgssSidenavHelperService.setSidenav(this.id, this.matSidenav);
  
      if (this.mediaObserver.isActive(this.isOpenBreakpoint)) {
        this.isOpen = true;
        this.matSidenav.mode = "side";
        this.matSidenav.toggle(true);
      } else {
        this.isOpen = false;
        this.matSidenav.mode = "over";
        this.matSidenav.toggle(false);
      }
  
      this.matchMediaService.onMediaChange
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe(() => {
          if (this.mediaObserver.isActive(this.isOpenBreakpoint)) {
            this.isOpen = true;
            this.matSidenav.mode = "side";
            this.matSidenav.toggle(true);
          } else {
            this.isOpen = false;
            this.matSidenav.mode = "over";
            this.matSidenav.toggle(false);
          }
        });
    }
  
    ngOnDestroy(): void {
      this.unsubscribeAll.next();
      this.unsubscribeAll.complete();
    }
  }
  
  @Directive({
    selector: "[tgssSidenavToggler]"
  })
  export class tgssSidenavTogglerDirective {
    @Input("tgssSidenavToggler")
    public id: any;
  
    constructor(private tgssSidenavHelperService: tgssSidenavHelperService) {}
  
    @HostListener("click")
    onClick() {
     
      this.tgssSidenavHelperService.getSidenav(this.id).toggle();
    }
  }
  