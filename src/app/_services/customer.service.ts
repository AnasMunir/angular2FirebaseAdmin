import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@Injectable()
export class CustomerService {

  customers$: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase) { }

  getAllCustomers() {
    return this.db.list('/users');
  }
}
