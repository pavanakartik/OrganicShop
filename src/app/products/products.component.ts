import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {


  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;

  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService, private shoppingCartService: ShoppingCartService
  ) {


    productService.getAll<Product>().pipe(switchMap(products => {
      this.products = products;

      return route.queryParamMap;
    }))

      .subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category == this.category) :
          this.products;

      });







  }


  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
      .valueChanges()
      .subscribe(cart => this.cart = cart);

  }

  ngOnDestroy() {

    this.subscription.unsubscribe();

  }

}
