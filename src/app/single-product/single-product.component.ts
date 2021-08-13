import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../products.service';
import { Subscription } from 'rxjs';
import { AppProduct } from '../modals/app-product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit, OnDestroy {

  id: string;
  product: AppProduct;
  productSubscribtion: Subscription;
  cartItems: any;
  subscription: Subscription;
  length = 600;
  readquantity = 'Read More';


  constructor(private route: ActivatedRoute, private productService: ProductsService,
    private cartService: ShoppingCartService) {

  }

  async ngOnInit() {

    this.productSubscribtion = this.route.paramMap.subscribe((params: Params) => {
      this.productService.getProduct(params.get('id'))
        .subscribe((item: AppProduct) => {
          this.product = item;
        });
    });

    this.subscription = (await this.cartService.getCartItems()).valueChanges().subscribe(cartItems => this.cartItems = cartItems);


  }

  ngOnDestroy() {
    this.productSubscribtion.unsubscribe();
  }

  addCart(product) {
    this.cartService.addToCart(product);

  }
  getQantity(item) {

    if (!this.cartItems) { return 0; }
    return this.cartItems[item.id] ? this.cartItems[item.id].quantity : 0;
  }

  removeCart(product) {
    this.cartService.removeFromCart(product);
  }

  readMore(length: number) {

    if (this.readquantity === 'Read More') {
      this.length = length;
      this.readquantity = 'Read Less';
    } else {
      this.length = 600;
      this.readquantity = 'Read More';

    }

  }

}
