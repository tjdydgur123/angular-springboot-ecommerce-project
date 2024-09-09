import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { provideHttpClient } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

// The order of the routes is important, first match wins. Starting from most specific to generic (top to down)
const routes: Routes = [
  // When path matches, it will create new instance of given component
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent }, // default category id will be set
  { path: 'products', component: ProductListComponent }, // default category id will be set
  { path: '', redirectTo: '/products', pathMatch: 'full' }, // if not given then redirect to the /products
  { path: '**', redirectTo: '/products', pathMatch: 'full' }, // use wildcard to match on anything that didn't match above routes
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
  ],
  // HttpClientModule is deprecated as of Angular 18 ... use provideHttpClient instead to inject the HttpClient service in service classes to send the API requests to Spring Boot Backend
  // Configure the router by adding RouterModule with the routes defined above. Then Angular recognizes the routes we set up
  imports: [BrowserModule, AppRoutingModule, RouterModule.forRoot(routes)],
  // By adding ProductService in providers, we can inject the service into other component classes
  providers: [provideClientHydration(), provideHttpClient(), ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}
