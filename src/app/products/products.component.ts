import { CategoryService } from './../category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  {


  products$;
  categories$;
  constructor(productService: ProductService, categorService: CategoryService) { 

    this.products$= productService.getAll();
    this.categories$= categorService.getAll();
  }

 

}
