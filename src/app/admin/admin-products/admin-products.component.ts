
import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import{Subscription} from 'rxjs';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product [];
  filteredProducts: any [];
subscription:  Subscription;

  constructor(private productService: ProductService) {

    this.subscription = productService.getAll<Product>().subscribe( p => this.filteredProducts = this.products = p)  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



  ngOnInit(): void {
  }

  filter(query:string){
    console.log(query);
    this.filteredProducts=(query)?
    this.products.filter(p=>p.title.toLowerCase().includes(query.toLowerCase()))
    : this.products;
  }

  
}
