import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../order.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/internal/operators/first';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {

  orders = [];
  userOrders = [];
  orderSubscribtion: Subscription;
  userId: string;

  constructor(private orderService: OrderService, private auth: AuthService) {

    auth.user$.pipe(first())
      .subscribe((item: any) => {
        this.userId = item.uid;
      }
      );
  }


  ngOnInit() {
    this.orderSubscribtion = this.orderService.getOrders().subscribe((item: any) => {

      console.log(item);

      item.forEach((v) => {
        v.placedTime = new Date(v.placedTime).toLocaleDateString();
      });

      this.userOrders = item.filter(v => v.userId === this.userId);
      this.orders = item;

      console.log(this.userOrders);
    });
  }

  ngOnDestroy() {
    this.orderSubscribtion.unsubscribe();
  }

}
