import { Component } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';
import { AddBookingComponent } from './add-booking/add-booking.component';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CardComponent, AddBookingComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent {}
