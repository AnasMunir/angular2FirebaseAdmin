import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CustomerService {

  customers$: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase) { }

  getAllCustomers() {
    return this.db.list('/users');
  }

  getCustomerDetails(id) {
    return this.db.list('/users/' + id);
  }
}
