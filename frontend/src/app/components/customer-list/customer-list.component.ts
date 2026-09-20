import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {

  customers: any[] = [];
  loading = true;
  errorMessage = '';
   searchText='';
   statusFilter='';

   currentPage = 1;
itemsPerPage = 5;
   
  constructor(private customerService: CustomerService) {}

  ngOnInit() {
  this.customerService.getCustomers().subscribe({
    next: (data) => {
      this.customers = data;
      this.loading = false;
    },

    error: (error) => {
      console.log('Error loading customers:', error);
      this.errorMessage = 'Failed to load customers';
      this.loading = false;
    }
  });
}

  showMessage() {
    alert('Add Customer clicked');
  }

  deleteCustomer(id: string) {

  const confirmDelete = confirm(
    'Are you sure you want to delete this customer?'
  );

  if (!confirmDelete) {
    return;
  }

  this.customerService.deleteCustomer(id).subscribe({
    next: (response) => {
      console.log('Customer deleted:', response);
      alert('Customer deleted successfully');

      this.customerService.getCustomers().subscribe(data => {
        this.customers = data;
      });
    },
    error: (error) => {
      console.log('Error deleting customer:', error);
      alert('Failed to delete customer');
    }
  });

}
 
get filteredCustomers() {

  return this.customers.filter((customer) => {

    const search = this.searchText.toLowerCase();

const matchesSearch =
  customer.name.toLowerCase().includes(search) ||
  customer.email.toLowerCase().includes(search) ||
  customer.companyName.toLowerCase().includes(search);

    const matchStatus =
      this.statusFilter === '' ||
      customer.status === this.statusFilter;

    return matchesSearch && matchStatus;

  });

}

get totalPages() {
  return Math.ceil(
    this.filteredCustomers.length / this.itemsPerPage
  );
}

get paginatedCustomers() {
  const start = (this.currentPage - 1) * this.itemsPerPage;

  return this.filteredCustomers.slice(
    start,
    start + this.itemsPerPage
  );
}


nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
  }
}

previousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}

}