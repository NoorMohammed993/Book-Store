import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/order.service';
import { first } from 'rxjs/internal/operators/first';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {

  orderId: string;
  orderIdSubscribtion: Subscription;
  order;
  cartsItems: any;
  cartItemCount: any;
  totalPrcie: any;

  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit() {
    this.orderIdSubscribtion = this.route.paramMap.subscribe((data: Params) => {
      this.orderId = data.get('id');
      console.log(this.orderId);
    });

    this.orderService.getOrder(this.orderId).pipe(first())
      .subscribe((data: any) => {
        console.log(data);
        this.order = data;
        this.cartItemCount = data[0].length;
        this.cartsItems = data[0];
        this.totalPrcie = data[3];
        console.log(this.order);
      });
  }

  ngOnDestroy() {
    this.orderIdSubscribtion.unsubscribe();
  }

}
