import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  orderId: string;
  order = [];
  cartItemCount;
  totalPrcie: number;
  cartsItems = [];

  constructor(private orderService: OrderService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.params['id'];

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

}
