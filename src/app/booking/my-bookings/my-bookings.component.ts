import { Component, Input } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';
import { CommonModule, DatePipe } from '@angular/common';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CardComponent, DatePipe, CommonModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss',
})
export class MyBookingsComponent {
  @Input() bookings: Booking[] = [];
}
