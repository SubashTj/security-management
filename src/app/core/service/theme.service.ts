import { Injectable, Inject, Renderer2, RendererFactory2, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import  { getQueryParam } from '../helpers/url.helper';

export interface ITheme {
  name: string,
  baseColor?: string,
  isActive?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public onThemeChange :EventEmitter<ITheme> = new EventEmitter();

  public tgssThemes :ITheme[]  = [{
    "name": "tgss-dark-purple",
    "baseColor": "#9c27b0",
    "isActive": false
  }, {
    "name": "tgss-dark-pink",
    "baseColor": "#e91e63",
    "isActive": false
  }, {
    "name": "tgss-blue",
    "baseColor": "#03a9f4",
    "isActive": true
  }, {
    "name": "tgss-light-purple",
    "baseColor": "#7367f0",
    "isActive": false
  }, {
    "name": "tgss-navy",
    "baseColor": "#10174c",
    "isActive": false 
  }];
  
  public activatedTheme: ITheme;
  private renderer: Renderer2;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  // Invoked in AppComponent and apply 'activatedTheme' on startup
  applyMatTheme( themeName: string) {

    this.activatedTheme = this.tgssThemes.find(t => t.name === themeName); 
    this.flipActiveFlag(themeName);
    // this.changeTheme(themeName);
    this.renderer.addClass(this.document.body, themeName);

  }

  changeTheme(prevTheme, themeName: string) {
    this.renderer.removeClass(this.document.body, prevTheme);
    this.renderer.addClass(this.document.body, themeName);
    this.flipActiveFlag(themeName);
    this.onThemeChange.emit(this.activatedTheme);
  }

  flipActiveFlag(themeName:string) {
    this.tgssThemes.forEach((t) => {
      t.isActive = false;
      if(t.name === themeName) {
        t.isActive = true;
        this.activatedTheme = t;
      }
    });
  }

  // *********** ONLY FOR DEMO **********
  setThemeFromQuery() {
    let themeStr = getQueryParam('theme');
    try {
      this.activatedTheme = JSON.parse(themeStr);
      this.flipActiveFlag(this.activatedTheme.name);
    } catch(e) {}
  }
}
