import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-view',
  standalone: true,
  imports: [],
  templateUrl: './customer-view.component.html',
  styleUrl: './customer-view.component.css'
})
export class CustomerViewComponent implements OnInit {

  customer: any;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router:Router
  ) {}

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.customerService.getCustomerById(id).subscribe({
        next: (data) => {
          this.customer = data;
          console.log('Customer:', data);
        },
        error: (error) => {
          console.log('Error:', error);
        }
      });
    }
  }

  goBack() {
  this.router.navigate(['/']);
}
}
