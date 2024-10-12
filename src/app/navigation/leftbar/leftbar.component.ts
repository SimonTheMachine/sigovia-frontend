// angular import
import { Component, EventEmitter, Output } from '@angular/core';

// project import
import { DattaConfig } from '../../app.config';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrl: './leftbar.component.scss',
})
export class LeftbarComponent {
  // public props
  @Output() NavCollapse = new EventEmitter();
  @Output() NavCollapsedMob = new EventEmitter();
  navCollapsed: any;
  navCollapsedMob = false;
  windowWidth = window.innerWidth;

  // constructor
  constructor() {
    this.navCollapsed =
      this.windowWidth >= 992 ? DattaConfig.isCollapseMenu : false;
  }

  // public method
  navCollapse() {
    if (this.windowWidth >= 992) {
      this.navCollapsed = !this.navCollapsed;
      this.NavCollapse.emit();
    }
  }

  navCollapseMob() {
    if (this.windowWidth < 992) {
      this.NavCollapsedMob.emit();
    }
  }
}
