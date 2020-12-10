import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

import { take } from 'rxjs/operators';
import { Product } from './models/product';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }


  async addToCart(product: Product) {                    //here we add the cart to firebase

    let cartId = await this.getOrCreateCartId();

    let item$ = await this.getItem(cartId, product.key);


    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      if (item.payload.val())
        item$.update({ product: product, quantity: item.payload.val().quantity + 1 })
      else
        item$.update({ product: product, quantity: 1 })
    })


  }





  private create() {

    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId();

    return this.db.object('/shopping-carts/' + cartId);
  }

  private async getOrCreateCartId() {

    let cartId = localStorage.getItem('cartId');

    if (cartId) return cartId;


    let result = await this.create();

    localStorage.setItem('cartId', result.key);

    return result.key;



  }


  private async getItem(cartId: string, productId: string) {

    console.log("PRODUCT ID : " + productId);
    return await this.db.object('/shopping-carts/' + cartId + '/items/' + productId);

  }
}
