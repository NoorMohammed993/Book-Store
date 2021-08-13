import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../products.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { AppProduct } from '../../modals/app-product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: AppProduct[];
  filteredProducts: AppProduct[];
  subscription: Subscription;
  resultState;

  constructor(private productService: ProductsService) {
    this.subscription = this.productService.getProducts().subscribe(v => this.filteredProducts = this.products = v);
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query) {
    console.log(query);
    this.filteredProducts = (query.toLowerCase()) ? this.products.filter(v => v.title.toLowerCase().includes(query)) : this.products;
    this.filteredProducts.length > 0 ? this.resultState = false : this.resultState = true;

  }

}
