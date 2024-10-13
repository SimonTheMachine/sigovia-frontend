import { Component } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { Booking } from '../models/booking.model';
import { CommonModule, DatePipe } from '@angular/common';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [AddBookingComponent, MyBookingsComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent {
  bookings: Booking[] = [];

  onBookingAdded(booking: Booking) {
    this.bookings.push(booking);
    console.log('Booking added:', booking);
  }
}
