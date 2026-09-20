import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent {

     constructor(private customerService: CustomerService,
                 private router:Router
     ) {}

     customerForm = new FormGroup({

  name: new FormControl('', [
    Validators.required
  ]),

  email: new FormControl('', [
    Validators.required,
    Validators.email
  ]),

  phone: new FormControl('', [
    Validators.required
  ]),

  companyName: new FormControl('', [
    Validators.required
  ]),

  country: new FormControl('', [
    Validators.required
  ]),

  city: new FormControl('', [
    Validators.required
  ]),

  address: new FormControl(''),

  customerType: new FormControl('', [
    Validators.required
  ]),

  status: new FormControl('Active', [
    Validators.required
  ])

});
  onSubmit() {
  if (this.customerForm.invalid) {
    this.customerForm.markAllAsTouched();
    return;
  }

  const customer = this.customerForm.value;

  this.customerService.addCustomer(customer).subscribe({
    next: (response) => {
      alert('Customer added successfully');
      this.router.navigate(['/']);
    },
    error: (error) => {
      alert('Failed to add customer');
    }
  });
}
}
