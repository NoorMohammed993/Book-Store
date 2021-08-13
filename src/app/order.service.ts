import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase) { }

  saveOrder(data) {

    return this.db.list('/orders').push(data);
  }
  getOrder(data) {

    return this.db.list('/orders/' + data).valueChanges();
  }

  getOrders() {
    return this.db.list('/orders').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.val();
        const id = a.payload.key;
        return { id, ...data };
      });
    }));
  }

}
