import { Component } from '@angular/core';
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

@Component({
  selector: 'app-add-booking',
  standalone: true,
  imports: [CardComponent, NgbModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-booking.component.html',
  styleUrl: './add-booking.component.scss',
})
export class AddBookingComponent {
  bookingForm!: FormGroup;

  constructor(private fb: FormBuilder) {}
  readonly timeValidator = Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/);

  ngOnInit(): void {
    this.bookingForm = this.fb.group(
      {
        bookingDescription: ['', Validators.required],
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
      console.log('Form Submitted', this.bookingForm.value);
    } else {
      console.log('Form is invalid');
    }
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
