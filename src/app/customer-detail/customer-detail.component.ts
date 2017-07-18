import { Component, OnInit } from '@angular/core';
import { CustomerService } from "../_services/customer.service";
import { ParamMap, ActivatedRoute } from "@angular/router";
// import { QRCodeComponent } from 'ng2-qrcode';
// import { QRCodeComponent } from 'angular2-qrcode';
declare var firebase : any;
// import firebase from 'firebase';
// import 'rxjs/add/operator/take';
// import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css'],
})
export class CustomerDetailComponent implements OnInit {

  customerDetail: any;
  videos: any;
  qrcodeValue: string = "";
  id: any;

  constructor(private cs: CustomerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCustomerDetails();
  }

  private async getCustomerDetails() {
    this.id = this.route.snapshot.params['id'];
    this.qrcodeValue = this.route.snapshot.params['id'];
    console.log("id", this.id);
    // this.customerDetail = this.cs.getCustomerDetails(id)/*.take(1).toPromise();*/
    //   .subscribe((data) => console.log(data));
    // console.log(this.customerDetail);
    this.customerDetail = this.cs.getCustomerDetails(this.id)/*.subscribe((data) => {
      console.log("subscription", data);
    });*/
    this.videos = this.cs.getCutomerVideos(this.id);
    
  }

  private async deleteVideo(/*index*/key, storageNumber) {
    console.log(key);
    console.log(storageNumber);
    try {
      const data = await this.cs.delteVideo(key, this.id)
      console.log(data);
      let storageRef = firebase.storage().ref();
      let videoRef = storageRef.child(this.id).child('videos').child(storageNumber.toString())
      videoRef.delete()
        // .then(() => console.log("deleted from storage"))
        // .catch((error) => console.error("error deleting from storage", error))
    } catch (error) {
      console.error(error);
    }
    // this.fs.delteVideo(key)
    //   .then((data) => console.log(data))
    //   .then(() => this.fs.getUserVideos())
    //   .catch((error) => console.error("error deleting video", error));
  }

}
