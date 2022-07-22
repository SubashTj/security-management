import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDropdownDirective } from './dropdown.directive';
import { DropdownAnchorDirective } from './dropdown-anchor.directive';
import { DropdownLinkDirective } from './dropdown-link.directive';
import { tgssSideNavToggleDirective } from './tgss-side-nav-toggle.directive';
import { tgssSidenavHelperDirective, tgssSidenavTogglerDirective } from './tgss-sidenav-helper/tgss-sidenav-helper.directive';


const directives = [

  AppDropdownDirective,
  DropdownAnchorDirective,
  DropdownLinkDirective,
  tgssSidenavHelperDirective,
  tgssSidenavTogglerDirective,
  tgssSideNavToggleDirective

]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: directives,
  exports: directives
})
export class SharedDirectivesModule {}