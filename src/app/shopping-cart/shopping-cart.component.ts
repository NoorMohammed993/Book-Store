import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { AppProduct } from '../modals/app-product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  itemsCount: number;
  items: AppProduct[] = [];
  totalPriceVisiability = false;
  totalPrice = 0;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async  ngOnInit() {

    (await this.shoppingCartService.getCartItems()).valueChanges()

      .subscribe((item: any) => {
        this.itemsCount = this.shoppingCartService.getCartItemsCounts(item);
        this.items = item ? Object.values(item) : [];
        this.totalPrice = 0;
        this.items.forEach((v: any) => {
          this.totalPrice += v.quantity * v.product.price;
        });
        console.log(this.items);
        this.totalPriceVisiability = this.items && this.items.length > 0 ? true : false;
      });

  }

  addItem(product) {
    this.shoppingCartService.addToCart(product);
  }
  removeItem(product) {
    this.shoppingCartService.removeFromCart(product);
  }

  clearShoppingCart() {
    this.shoppingCartService.clearShoppingCart();
  }


}
