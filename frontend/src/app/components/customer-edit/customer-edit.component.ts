import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.css'
})
export class CustomerEditComponent implements OnInit {

  customerId = '';

  customerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    phone: new FormControl('', Validators.required),
    companyName: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    address: new FormControl(''),
    customerType: new FormControl('', Validators.required),
    status: new FormControl('Active', Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.customerId = id;

      this.customerService.getCustomerById(id).subscribe({
            next: (customer) => {
  this.customerForm.patchValue({
    ...customer,
    country: customer.country.toLowerCase(),
    city: customer.city.toLowerCase()
  });
},
        error: (error) => {
          console.log('Error:', error);
        }
      });
    }
  }

  onSubmit() {
  if (this.customerForm.invalid) {
    return;
  }

  const customer = this.customerForm.value;

  this.customerService.updateCustomer(
    this.customerId,
    customer
  ).subscribe({
    next: (response) => {
      console.log('Customer updated successfully:', response);
      alert('Customer updated successfully');
       this.router.navigate(['/']);
    },
    error: (error) => {
      console.log('Error updating customer:', error);
      alert('Failed to update customer');
    }
  });
}
}