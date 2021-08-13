import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppProduct } from '../modals/app-product';
import { trigger, transition, state, style, animate } from '@angular/animations';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 0 }),
        animate(600)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      // transition(':leave',
      // animate(600, style({ opacity: 0 }))
    ])
  ]
})
export class StoreComponent implements OnInit, OnDestroy {

  products: AppProduct[] = [];
  filteredProduces: AppProduct[] = [];
  category_id;
  subscription: Subscription;
  subscription2: Subscription;


  constructor(private productService: ProductsService,
    private activatedRoue: ActivatedRoute) {

    this.subscription = this.productService.getProducts().subscribe(products => {
      this.products = products;

      this.activatedRoue.queryParamMap.subscribe(query => {
        this.category_id = query.get('category');
        this.filteredProduces = [];
        this.filteredProduces = this.category_id === 'all' || this.category_id == null ?
          this.products : this.products.filter(p => p.category === this.category_id);
      });
    });

  }

  async  ngOnInit() {

  }

  ngOnDestroy() {

    this.subscription.unsubscribe();

  }
}
