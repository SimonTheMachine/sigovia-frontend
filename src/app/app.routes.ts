import { Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';

export const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: '',
        redirectTo: 'booking',
        pathMatch: 'full',
      },
      {
        path: 'booking',
        loadComponent: () =>
          import('./booking/booking.component').then((m) => m.BookingComponent),
      },
    ],
  },
];
