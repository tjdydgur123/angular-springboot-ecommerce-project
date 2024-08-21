import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  doSearch(value: string) {
    console.log(`value=${value}`);
    // The data 'value' come from search.component.html when user either enter or click the button with the keyword.
    // Route the data to our "search" route in app.module.ts
    // It will be handled by the ProductListComponent.
    // We are reusing the ProductListComponent to list the products by the search keyword passwed from user.
    this.router.navigateByUrl(`/search/${value}`);
  }
}
