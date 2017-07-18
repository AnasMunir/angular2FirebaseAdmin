import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Http, Response, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CustomerService {

  customers$: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase, private http: Http) { }

  getAllCustomers() {
    return this.db.list('/users');
  }

  getCustomerDetails(id) {
    return this.db.object('/users/' + id);
  }

  getCutomerVideos(id) {
    return this.db.list('/users/' + id + '/videos/');
  }

  delteVideo(uid, key, storageNumber) {
    // return this.db.object('/users/' + uid + '/videos/' + key).remove();
    let url = "https://frozen-journey-24504.herokuapp.com/api/delete_video"
    let body = new URLSearchParams();
    body.set("uid", uid);
    body.set("videoKey", key);
    body.set("storageNumber", storageNumber);

    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    console.log(body);

    return this.http.post(url, body, options)
      // .do(this.logResponse)
      .map(this.extractData)
      .catch(this.catchError)
  }

  private logResponse(res: Response) {
    console.log(res.json());
  }

  private extractData(res: Response) {
    return res;
  }

  private catchError(error: Response | any) {
    console.log(error);
    return Observable.throw(error.json().error || error || "some error in http get");
    // return Promise.reject(error.json().error || error || "some error in http post");
  }
}
