import { Product } from '../../common/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-table.component.html',
  // templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductService) {}

  // ngOnInit is called once the ProductListComponent is initialized.
  ngOnInit(): void {
    this.listProducts();
  }

  listProducts() {
    // method is invoked once it is "subscribe"
    this.productService.getProductList().subscribe((data) => {
      // assinging received data (from backend api) to the Product array
      this.products = data;
    });
  }
}
