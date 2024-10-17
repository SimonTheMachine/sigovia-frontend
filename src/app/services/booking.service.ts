import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = 'http://localhost:5001/api/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getBookings(): Observable<Booking[]> {
    return this.http
      .get<Booking[]>(this.apiUrl + 'Booking', this.httpOptions)
      .pipe(
        map((bookings: any[]) =>
          bookings.map((booking) => ({
            ...booking,
            startDate: new Date(booking.startDate),
            endDate: new Date(booking.endDate),
          }))
        )
      );
  }

  addBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(
      this.apiUrl + 'Booking',
      booking,
      this.httpOptions
    );
  }
}
