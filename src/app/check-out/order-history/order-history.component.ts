import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/shopping-cart.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {

  @Input() cartItemCount;
  @Input() cartsItems;
  @Input() totalPrcie;
  @Input() showSubTitle;

  constructor(private shoppingCartService: ShoppingCartService) { }

}
