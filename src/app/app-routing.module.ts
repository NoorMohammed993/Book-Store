
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { LoginComponent } from './login/login.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AuthGuardService } from './auth-guard.service';
import { AdminAuthService } from './admin-auth.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { IndexComponent } from './index/index.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { OrderDetailsComponent } from './my-orders/order-details/order-details.component';


const routes: Routes = [

  { path: '', component: IndexComponent },
  { path: 'store', component: StoreComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'product/:id', component: SingleProductComponent },
  { path: 'login', component: LoginComponent },


  { path: 'order/Details/:id', component: OrderDetailsComponent, canActivate: [AuthGuardService] },
  { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuardService] },
  { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService] },
  { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuardService] },

  { path: 'admin/new/products', component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthService] },
  { path: 'admin/product/:id', component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthService] },
  { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuardService, AdminAuthService] },
  { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuardService, AdminAuthService] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const components = [StoreComponent, ProductsComponent, ShoppingCartComponent, MyOrdersComponent,
  CheckOutComponent, OrderSuccessComponent, LoginComponent, AdminProductsComponent, AdminOrdersComponent,
  ProductFormComponent, IndexComponent, NotFoundComponent, SingleProductComponent, OrderDetailsComponent];
