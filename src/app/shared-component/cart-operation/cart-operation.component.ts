import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ShoppingCartService } from 'src/app/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-operation',
  templateUrl: './cart-operation.component.html',
  styleUrls: ['./cart-operation.component.css']
})
export class CartOperationComponent implements OnInit, OnDestroy {

  @Input() item;
  cartItems: any;
  subscription: Subscription;



  constructor(private shoppingCart: ShoppingCartService) { }

  async ngOnInit() {
    this.subscription = (await this.shoppingCart.getCartItems()).valueChanges().subscribe(cartItems => this.cartItems = cartItems);
  }

  addCart(product) {
    this.shoppingCart.addToCart(product);

  }

  removeCart(product) {
    this.shoppingCart.removeFromCart(product);
  }

  getQantity() {

    if (!this.cartItems) { return 0; }
    return this.cartItems[this.item.id] ? this.cartItems[this.item.id].quantity : 0;
  }

  ngOnDestroy() {

    this.subscription.unsubscribe();

  }

}
