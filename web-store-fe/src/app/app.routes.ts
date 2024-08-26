import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './component/items/items.component';
import { CustomerComponent } from './component/customers/customers.component';
import { OrdersComponent } from './component/orders/orders.component';

const routes: Routes = [
  { path: 'items', component: ItemsComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'orders', component: OrdersComponent },
  { path: '', redirectTo: '/items', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export { routes };
