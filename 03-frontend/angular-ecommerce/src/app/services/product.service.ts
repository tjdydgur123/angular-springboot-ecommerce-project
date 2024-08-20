import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

// @Injectable allows this given service can be injected into other classes or components
// providedIn: 'root' -> means allow everywhere
@Injectable({
  providedIn: 'root',
})

// This is a Angular service that interacts with a backend API to retrieve data.
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) {}

  // This method is responsible for making an HTTP GET request to the backend to fetch a list of products.
  // It returns observable. Map the JSON data from Spring Data REST to Product array
  getProductList(theCategoryId: number): Observable<Product[]> {
    // need to build URL based on category id
    // below endpoint is exposed by Spring Data REST based on the query name
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return (
      this.httpClient
        // send the GET request to the given backend baseUrl or other url using httpClient
        // The generic type <GetResponseProducts> specifies the expected structure of the response data,
        // which is defined by the GetResponseProducts interface.
        .get<GetResponseProducts>(searchUrl)
        // pipe it and then map the data(response) to the given data type
        .pipe(map((response) => response._embedded.products))
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }
}

// It's supporting interface that helps us mapping.
// It's used to help TypeScript understand the shape of the data.
// It unwraps the JSON from Spring Data REST _embedded entry.
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
