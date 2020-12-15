import { Product } from './../models/product';
import { Component, Input, OnInit } from '@angular/core';

import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {

  @Input('product') product: Product;

  @Input('show-actions') showActions = true;

  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }


  addToCart() {


    this.cartService.addToCart(this.product);

  }

removeFromCart(){

this.cartService.removeFromCart(this.product);


}
  


 

}
