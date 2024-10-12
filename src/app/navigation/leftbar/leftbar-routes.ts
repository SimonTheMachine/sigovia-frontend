import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'booking-page',
        title: 'My Bookings',
        type: 'item',
        url: '/booking',
        icon: 'feather icon-home',
        classes: 'nav-item',
      },
    ],
  },
];

@Injectable({
  providedIn: 'root',
})
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
