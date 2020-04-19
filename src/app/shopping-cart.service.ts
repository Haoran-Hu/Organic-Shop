import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from './models/product';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-cart').push({
      dataCreated: new Date().getTime()
    });
  }

  private getCart(cartId: string) {
    this.db.object('/shopping-cart/' + cartId);
  }

  private async getOrCreateCartId() {
    // tslint:disable-next-line:prefer-const
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      const result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
    return cartId;
  }

  async addToCart(product: Product) {
    // tslint:disable-next-line:prefer-const
    let cartId = await this.getOrCreateCartId();

    // tslint:disable-next-line:prefer-const
    let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.$key);

    // tslint:disable-next-line:variable-name
    item$.snapshotChanges().take(1).subscribe((item: any) => {
      if (item) {
        item$.update({
          quantity: item.quantity + 1
        });
      } else {
        item$.set({
          product,
          quantity: 1
        });
      }
    });
  }
}
