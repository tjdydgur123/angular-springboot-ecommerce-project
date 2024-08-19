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

@NgModule({
  declarations: [AppComponent, ProductListComponent],
  // HttpClientModule is deprecated... use provideHttpClient instead to inject the HttpClient service
  imports: [BrowserModule, AppRoutingModule],
  // By adding ProductService, we can inject the given service into other class and component
  providers: [provideClientHydration(), provideHttpClient(), ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}
