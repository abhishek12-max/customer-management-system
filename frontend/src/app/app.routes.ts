import { Routes } from '@angular/router';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerViewComponent } from './components/customer-view/customer-view.component';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';

export const routes: Routes = [
    {
        path:'',
        component: CustomerListComponent
    },
    {
        path:'add-customer',
        component:CustomerFormComponent
    },
    {
        path:"customers/:id",
        component:CustomerViewComponent
    },
    {
       path:"customers/:id/edit",
       component:CustomerEditComponent
    }
];
