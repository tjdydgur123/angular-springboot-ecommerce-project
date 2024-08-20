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

// The order of the routes is important, first match wins. Starting from most specific to generic
const routes: Routes = [
  // When path matches, it will create new instance of given component
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent }, // default category id will be set
  { path: 'products', component: ProductListComponent }, // default category id will be set
  { path: '', redirectTo: '/products', pathMatch: 'full' }, // if not given then redirect to the /products
  { path: '**', redirectTo: '/products', pathMatch: 'full' }, // it will match on anything that didn't match above routes
];

@NgModule({
  declarations: [AppComponent, ProductListComponent, ProductCategoryMenuComponent],
  // HttpClientModule is deprecated... use provideHttpClient instead to inject the HttpClient service
  // Configure the router by adding RouterModule with the routes defined from above. Then it recognizes we set up the routes
  imports: [BrowserModule, AppRoutingModule, RouterModule.forRoot(routes)],
  // By adding ProductService, we can inject the given service into other class and component
  providers: [provideClientHydration(), provideHttpClient(), ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}
