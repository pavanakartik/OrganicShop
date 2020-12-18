import { OrderService } from 'shared/services/order.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { UserService } from './services/user.service';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { AuthService } from 'shared/services/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCardComponent } from 'shared/components/product-card/product-card.component';
import { ProductQuantityComponent } from 'shared/components/product-quantity/product-quantity.component';


@NgModule({
  declarations: [ProductCardComponent,
    ProductQuantityComponent],
  imports: [
    CommonModule
  ],
  exports: [ProductCardComponent,
    ProductQuantityComponent

  ],

  providers: [AuthService,
    AuthGuard,

    UserService,
    CategoryService, ProductService,
    ShoppingCartService,
    OrderService]



})
export class SharedModule { }
