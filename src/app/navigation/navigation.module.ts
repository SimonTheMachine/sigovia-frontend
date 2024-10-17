import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation.component';
import { NavCollapseComponent } from './leftbar/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './leftbar/nav-content/nav-item/nav-item.component';
import { NavGroupComponent } from './leftbar/nav-content/nav-group/nav-group.component';
import { NavLogoComponent } from './leftbar/nav-logo/nav-logo.component';
import { NavContentComponent } from './leftbar/nav-content/nav-content.component';
import { LeftbarComponent } from './leftbar/leftbar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NavigationItem } from './leftbar/leftbar-routes';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    NavigationComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavGroupComponent,
    NavLogoComponent,
    NavContentComponent,
    LeftbarComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgScrollbarModule,
    BreadcrumbsComponent,
    NavBarComponent,

    // BrowserAnimationsModule,
  ],
  exports: [NavigationComponent, SpinnerComponent],
  providers: [NavigationItem],
})
export class NavigationModule {}
