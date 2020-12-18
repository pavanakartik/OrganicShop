import { ShoppingCartItem } from './models/shopping-cart-item'
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';


import { Injectable } from '@angular/core';

import { take, map } from 'rxjs/operators';
import { Product } from './models/product';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }


  async addToCart(product: Product) {                    //here we add the cart to firebase


    this.updateItem(product, 1);


  }


  async removeFromCart(product: Product) {

    this.updateItem(product, -1);



  }





  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();

    return this.db.object('/shopping-carts/' + cartId)
      .valueChanges()

      .pipe(map((x) => {
        if (x == null) { return new ShoppingCart(); }
        return new ShoppingCart(x['items']);

      }));

  }



  public async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }





  private async getOrCreateCartId() {

    let cartId = localStorage.getItem('cartId');

    if (cartId) return cartId;


    let result = await this.create();

    localStorage.setItem('cartId', result.key);

    return result.key;



  }


  private getItem(cartId: string, productId: string) {

    console.log("PRODUCT ID : " + productId);


    return this.db.object<ShoppingCartItem>('/shopping-carts/' + cartId + '/items/' + productId);

  }



  private async updateItem(product: Product, change: number) {

    let cartId = await this.getOrCreateCartId();
    console.log(cartId);

    console.log(product.key);
    let item$ = this.getItem(cartId, product.key);
    console.log(item$);

    item$.snapshotChanges().pipe(take(1)).subscribe((item?: any) => {


      let quantity = change;


      if (item.payload.exists()) {
        quantity = item.payload.val().quantity + change;
      }


      //let quantity = (item.quantity || 0) + change;
      console.log(quantity + "  " + change);


      if (quantity === 0) item$.remove();

      else item$.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity
      });

    });



  }


  private create() {

    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }
}
