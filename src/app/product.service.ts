import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: Product) {
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<any> {
    return this.db.list('/products').valueChanges();
  }

  get(productId: string): Observable<any> {
    return this.db.object('/products/' + productId).snapshotChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
