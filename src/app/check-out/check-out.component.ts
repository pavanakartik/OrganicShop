import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shipping: any = {};
  cart: ShoppingCart;
  cartSubscription: Subscription;
  userId: string;

  userSubscription: Subscription
  /**
   *
   */
  constructor(

    private router: Router,
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,

    private orderService: OrderService) {


  }

  async ngOnInit() {

    let cart$ = await this.shoppingCartService.getCart();

    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
   this.userSubscription= this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();

  }




 async placeOrder() {
    console.log(this.shipping);

    let order = new Order(this.userId, this.shipping, this.cart);

   
 let result=  await this.orderService.storeOrder(order);

 this.router.navigate(['/order-success', result.key]);
  }

}
