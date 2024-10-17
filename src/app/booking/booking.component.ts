import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { Booking } from '../models/booking.model';
import { CommonModule, DatePipe } from '@angular/common';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { BookingService } from '../services/booking.service';
import { BreadcrumbsComponent } from '../navigation/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [AddBookingComponent, MyBookingsComponent, BreadcrumbsComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent implements OnInit {
  bookings: Booking[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getBookings().subscribe({
      next: (data) => {
        console.log('Bookings fetched:', data);
        this.bookings = data;
      },
      error: (error) => {
        console.error('Error fetching bookings', error);
      },
    });
  }

  onBookingAdded(booking: Booking) {
    this.bookingService.addBooking(booking).subscribe({
      next: (newBooking) => {
        this.bookings.push(newBooking);
        console.log('Booking added:', newBooking);
      },
      error: (error) => {
        console.error('Error adding booking', error);
      },
    });
  }
}
