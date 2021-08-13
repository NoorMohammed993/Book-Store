import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';



@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent {

  @Output() saveOrder: EventEmitter<any> = new EventEmitter<any>();
  @Input() cartItemCount;


  save(f) {
    this.saveOrder.emit(f);
  }

}
