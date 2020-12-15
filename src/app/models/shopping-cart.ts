import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {

    
    constructor(public items: ShoppingCartItem[]) {
    
        
    }

    get totalItemsCount(){
        let count = 0;

        for (let productId in this.items)
  count += this.items[productId].quantity;
  
  return count ;
    }
}