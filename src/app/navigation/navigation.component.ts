import { Component } from '@angular/core';
import { Location } from '@angular/common';

// project import
import { DattaConfig } from '../app.config';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  navCollapsed: any;
  navCollapsedMob: boolean;
  windowWidth: number;

  constructor(private location: Location) {
    let current_url = this.location.path();
    const baseHref = this.location.prepareExternalUrl('');
    if (baseHref) {
      current_url = baseHref + this.location.path();
    }

    this.windowWidth = window.innerWidth;
    this.navCollapsed =
      this.windowWidth >= 992 ? DattaConfig.isCollapseMenu : false;
    this.navCollapsedMob = false;
  }

  navMobClick() {
    if (
      this.navCollapsedMob &&
      !document
        .querySelector('app-leftbar.pcoded-navbar')
        ?.classList.contains('mob-open')
    ) {
      this.navCollapsedMob = !this.navCollapsedMob;
      setTimeout(() => {
        this.navCollapsedMob = !this.navCollapsedMob;
      }, 100);
    } else {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeMenu();
    }
  }

  closeMenu() {
    if (
      document
        .querySelector('app-leftbar.pcoded-navbar')
        ?.classList.contains('mob-open')
    ) {
      document
        .querySelector('app-leftbar.pcoded-navbar')
        ?.classList.remove('mob-open');
    }
  }
}
