import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { take, first } from 'rxjs/operators';
import { AppProduct } from './modals/app-product';



@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  clearShoppingCart() {
    const cartId = localStorage.getItem('cartId');
    return this.db.object('/shopping-cart/' + cartId + '/items').remove();

  }

  async getCartItems() {

    const cartId = await (this.getOrCreateCartId());
    return this.db.object('/shopping-cart/' + cartId + '/items');

  }

  async getOrCreateCartId(): Promise<string> {

    const cartId = localStorage.getItem('cartId');

    if (cartId) { return cartId; }


    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private create() {
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    });
  }

  addToCart(product: AppProduct) {

    this.chanageQuantity(product, 1);
  }

  removeFromCart(product: AppProduct) {
    const cartId = localStorage.getItem('cartId');
    this.chanageQuantity(product, -1);
  }

  private async chanageQuantity(product: AppProduct, chanage: number) {

    const cartId = localStorage.getItem('cartId');
    const item$ = this.db.object('/shopping-cart/' + cartId + '/items/' + product.id);

    item$.valueChanges().pipe(first()).subscribe((item: any) => {

      const updatedQuantity = item ? (item.quantity) + chanage : '';

      if (updatedQuantity === 0) {
        item$.remove();
      } else {
        if (!item) {
          item$.set({ product: product, quantity: 1 });
        } else {
          item$.update({ quantity: updatedQuantity });
        }
      }

    });
  }

  getCartItemsCounts(items) {

    let count = 0;
    if (!items) {

      return count;
    }
    for (const productId in items) {

      if (items.hasOwnProperty(productId)) {
        count += items[productId].quantity;
      }
    }
    return count;
  }

}
