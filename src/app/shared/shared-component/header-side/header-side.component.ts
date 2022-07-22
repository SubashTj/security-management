import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { LayoutService } from 'src/app/core/service/layout.service';
import { ThemeService } from 'src/app/core/service/theme.service';

@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.component.html',
  styleUrls: ['./header-side.component.scss']
})
export class HeaderSideComponent implements OnInit {
  @Input() notificPanel;
  @Input() messagePanel;
  public availableLangs = [{
    name: 'EN',
    code: 'en',
    flag: 'flag-icon-us'
  }, {
    name: 'ES',
    code: 'es',
    flag: 'flag-icon-es'
  }]
  currentLang = this.availableLangs[0];

  public tgssThemes;
  public layoutConf:any;

  constructor(
    private themeService: ThemeService,
    private layout: LayoutService,
    private renderer: Renderer2
  ) {}
  ngOnInit() {
    this.tgssThemes = this.themeService.tgssThemes;
    this.layoutConf = this.layout.layoutConf;
 
  }
  setLang(lng) {
    this.currentLang = lng;

  }
  changeTheme(theme) {
    // this.themeService.changeTheme(theme);
  }
  
  toggleNotific() {
    this.notificPanel.toggle();
  }
  toggleMessage() {
    this.messagePanel.toggle();
  }
  toggleSidenav() {
    if(this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      })
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    })
  }

  toggleCollapse() {
    // compact --> full
    if(this.layoutConf.sidebarStyle === 'compact') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full',
        sidebarCompactToggle: false
      }, {transitionClass: true})
    }

    // * --> compact
    this.layout.publishLayoutChange({
      sidebarStyle: 'compact',
      sidebarCompactToggle: true
    }, {transitionClass: true})

  }

  onSearch(e) {
   
  }
}
