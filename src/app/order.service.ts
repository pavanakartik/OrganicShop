
import { ShoppingCartService } from './shopping-cart.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService
  ) {

  }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/orders').snapshotChanges();
  }

  getOrdersByUser(userId: string) {


    
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges();

  }

}