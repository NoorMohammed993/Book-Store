import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { AppProduct } from './modals/app-Product';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {

    this.db.list('products/').push(product);
  }

  getProducts(): Observable<AppProduct[]> {
    return this.db.list<AppProduct>('/products').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.val();
        const id = a.payload.key;
        return { id, ...data };
      });
    }));
  }

  getProduct(id: string) {
    return this.db.object('/products/' + id).valueChanges();
  }

  update(id, product) {
    this.db.object('/products/' + id).update(product);
  }
  delete(id) {
    this.db.object('/products/' + id).remove();
  }
}
