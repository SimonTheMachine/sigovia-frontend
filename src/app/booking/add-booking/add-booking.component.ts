import { Component, EventEmitter, Output } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-add-booking',
  standalone: true,
  imports: [CardComponent, NgbModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-booking.component.html',
  styleUrl: './add-booking.component.scss',
})
export class AddBookingComponent {
  @Output() bookingAdded = new EventEmitter<Booking>();

  bookingForm!: FormGroup;

  constructor(private fb: FormBuilder) {}
  readonly timeValidator = Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/);

  ngOnInit(): void {
    this.bookingForm = this.fb.group(
      {
        name: ['', Validators.required],
        fromDate: ['', [Validators.required, dateValidator]],
        fromTime: ['', [Validators.required, this.timeValidator]],
        toDate: ['', [Validators.required, dateValidator]],
        toTime: ['', [Validators.required, this.timeValidator]],
      },
      { validators: dateTimeRangeValidator }
    );
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      const booking: Booking = {
        name: this.bookingForm.value.name,
        startDate: this.combineDateAndTime(
          this.bookingForm.value.fromDate,
          this.bookingForm.value.fromTime
        ),
        endDate: this.combineDateAndTime(
          this.bookingForm.value.toDate,
          this.bookingForm.value.toTime
        ),
      };
      this.bookingAdded.emit(booking);
      console.log('Form Submitted', booking);

      // Reset form
      this.bookingForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }

  private combineDateAndTime(date: NgbDateStruct, time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    return new Date(date.year, date.month - 1, date.day, hours, minutes);
  }
}

function dateValidator(control: AbstractControl): ValidationErrors | null {
  const value: NgbDateStruct = control.value;
  if (!value || !value.year || !value.month || !value.day) {
    return { invalidDate: true };
  }
  return null;
}

function dateTimeRangeValidator(group: FormGroup): ValidationErrors | null {
  const fromDate = group.get('fromDate')?.value;
  const fromTime = group.get('fromTime')?.value;
  const toDate = group.get('toDate')?.value;
  const toTime = group.get('toTime')?.value;

  if (!fromDate || !fromTime || !toDate || !toTime) {
    return null; // Skip validation if any date or time is missing
  }

  const fromDateTime = new Date(
    fromDate.year,
    fromDate.month - 1,
    fromDate.day,
    ...fromTime.split(':').map(Number)
  );
  const toDateTime = new Date(
    toDate.year,
    toDate.month - 1,
    toDate.day,
    ...toTime.split(':').map(Number)
  );

  return fromDateTime < toDateTime ? null : { dateTimeRangeInvalid: true };
}
