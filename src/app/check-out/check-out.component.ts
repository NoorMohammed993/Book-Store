import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart.service';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shopping = {};
  cartsItems = [];
  totalPrcie = 0;
  cartItemCount = 0;
  itemsSubscription: Subscription;
  userSubscription: Subscription;
  userId: string;


  constructor(private shoppingCartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService,
    private route: Router) { }

  async  ngOnInit() {

    const v = await (this.shoppingCartService.getCartItems());
    this.itemsSubscription = v.valueChanges()
      .subscribe((items$: any) => {

        /////////////////////////// get Item count /////////////////////////////////
        this.cartItemCount = 0;
        this.cartItemCount = this.shoppingCartService.getCartItemsCounts(items$);

        /////////////////////////// get cart items total price ///////////////////

        this.cartsItems = items$ ? Object.values(items$) : [];
        this.totalPrcie = 0;
        this.cartsItems.forEach((value: any) => {
          this.totalPrcie += value.quantity * value.product.price;
        });
      });
    this.userSubscription = this.authService.user$.subscribe((data: any) => {
      console.log(data);
      this.userId = data ? data.uid : null;
    });
  }
  async saveOrder(f) {

    const order = {
      placedTime: new Date().getTime(),
      shippingInfo: f.value,
      items: this.cartsItems,
      totalPrcie: this.totalPrcie,
      userId: this.userId,
    };

    const result = await (this.orderService.saveOrder(order));
    this.shoppingCartService.clearShoppingCart();
    this.route.navigate(['/order-success', result.key]);
    console.log(result.key);
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
    this.userSubscription.unsubscribe();

  }
}
