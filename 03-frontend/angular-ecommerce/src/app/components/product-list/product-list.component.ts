import { ActivatedRoute } from '@angular/router';
import { Product } from '../../common/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;

  constructor(
    private productService: ProductService,
    // current active route that loaded the component. Need for accessing route parameters
    private route: ActivatedRoute
  ) {}

  // ngOnInit is called once the ProductListComponent is initialized.
  ngOnInit(): void {
    // Whenever the route parameters change, the function inside the subscribe block is executed.
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleListProducts() {
    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // then get the "id" param string. convert string to a number using the "+" symbol
      // "!" is the non-null assertion operator. It tells compiler the object is not null.
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      // no category id is available ... default to category id 1
      this.currentCategoryId = 1;
    }

    // method is invoked once it is "subscribe"
    // get the products for the given catefory id by passing the category id
    this.productService
      .getProductList(this.currentCategoryId)
      .subscribe((data) => {
        // assinging received data (from backend api) to the Product array
        this.products = data;
        // console.log(data);
      });
  }

  handleSearchProducts() {
    const theKeyword = this.route.snapshot.paramMap.get('keyword')!;

    // now search for the products using keyword
    this.productService.searchProducts(theKeyword).subscribe((data) => {
      this.products = data;
    });
  }
}
