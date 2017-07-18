import { Component, OnInit } from '@angular/core';
import { CustomerService } from "../_services/customer.service";
import { ParamMap, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
// import { QRCodeComponent } from 'ng2-qrcode';
// import { QRCodeComponent } from 'angular2-qrcode';
declare var firebase: any;
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

  constructor(
    private cs: CustomerService,
    private route: ActivatedRoute,
    private location: Location) { }

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

  private deleteVideo(/*index*/key, storageNumber) {
    console.log(key);
    console.log(storageNumber);
    try {
      this.cs.delteVideo(this.id, key, storageNumber)
        .subscribe(
        (data) => {
          console.log("data returned", data);
          console.log("data returned in json", data.json());
          console.log("stringyfied", JSON.stringify(data));
        }, error => {
          console.error("error in delete api", error);
        }
        );
    } catch (error) {
      console.error(error);
    }
  }

  private async deleteUser() {
    try {
      const response = await this.cs.delteUser(this.id).take(1).toPromise();
      console.log("response returned", response);
      console.log("response returned in json", response.json());
      console.log("stringyfied", JSON.stringify(response));
      this.location.back()
    } catch (error) {
      console.error("error in response", error);
    }
  }

}
