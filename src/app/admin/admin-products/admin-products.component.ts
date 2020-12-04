
import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';



@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};

  products: Product[] = [];
  filteredProducts: Product[]= [];

  dtTrigger: Subject<any> = new Subject<any>();


  subscription: Subscription;

  constructor(private productService: ProductService) {




  }


  ngOnDestroy(): void {
    
    this.dtTrigger.unsubscribe();
  }



  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 3
    };

    this.productService.getAll<Product>().subscribe(p => {
      this.filteredProducts  = p;
      this.dtTrigger.next();
    })

  }

  filter(query: string) {
    console.log(query);
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
      : this.products;
  }


}
