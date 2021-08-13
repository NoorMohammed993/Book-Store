import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductsService } from '../../products.service';
import { ActivatedRoute } from '@angular/router';
import { AppProduct } from '../../modals/app-product';
import { AngularFireList } from 'angularfire2/database';
import { Observable, from, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  id;
  categories$;
  product;
  subscription: Subscription;
  constructor(public category: CategoryService,
    private productService: ProductsService,
    private route: Router,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.categories$ = this.category.getCategories();
    this.id = this.activatedRoute.snapshot.paramMap.get('id') ? this.activatedRoute.snapshot.paramMap.get('id') : null;
    if (this.id) { this.subscription = this.productService.getProduct(this.id).subscribe(x => this.product = x); }

  }
  ngOnDestroy() {
    if (this.id) { this.subscription.unsubscribe(); }
  }

  save(product) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.route.navigate(['/admin/products']);
  }

  delete() {
    if (confirm('Are sure!')) {
      this.productService.delete(this.id);
      this.route.navigate(['/admin/products']);
    }
  }
}
