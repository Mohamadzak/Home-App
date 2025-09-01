import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo"
        alt="Exterior photo of {{housingLocation?.name}}"/>
      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2>
        <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{housingLocation?.availableUnits}}</li>
          <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
          <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (ngSubmit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName" required>

          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName" required>

          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" required>

          <button type="submit" class="primary" [disabled]="applyForm.invalid">Apply now</button>
        </form>
        <p *ngIf="submissionMessage">{{ submissionMessage }}</p>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  private route = inject(ActivatedRoute);
  private housingService = inject(HousingService);
  private http = inject(HttpClient);

  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  submissionMessage = '';

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }

  submitApplication() {
  if (this.applyForm.invalid) {
    this.submissionMessage = 'Please fill all required fields correctly.';
    return;
  }

  const formValue = this.applyForm.value;

  const data = {
    title: `${formValue.firstName} ${formValue.lastName}`,
    completed: false,
    email: formValue.email,
  };

  this.housingService.submitApplication(data).subscribe({
    next: (res) => {
      this.submissionMessage = 'Application submitted successfully!';
      this.applyForm.reset();
    },
    error: (err) => {
      console.error('Error:', err);
      this.submissionMessage = 'Submission failed. Please try again.';
    },
    });
   }
  }

