import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild("updateStatus") currentStatus: ElementRef;
  customerDetail: any;
  videos: any;
  qrcodeValue: string = "";
  id: any;
  status = ["Basic", "Standard", "Premium"];
  disableStatus: boolean = true;

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
          console.log("data returned in json", data.json());
        }, error => {
          console.error("error in delete api", error);
        }
        );
    } catch (error) {
      console.error(error);
    }
  }

  async deleteUser() {
    try {
      const response = await this.cs.delteUser(this.id).take(1).toPromise();
      console.log("response returned in json", response.json());
      this.location.back()
    } catch (error) {
      console.error("error in response", error);
    }
  }

  async updateMembership() {
    try {
      let status: string = this.currentStatus.nativeElement.value;
      const response = await this.cs.updateMembership(this.id, status).take(1).toPromise()
      console.log("response returned in json", response.json());
    } catch (error) {
      console.error(error);
    }
  }

  blockUser() {
    this.cs.blockUser(this.id)
      .subscribe(
      (response) => {
        console.log("response", response)
      }, error => {
        console.error("error blocking user", error)
      });
  }

  logStatus() {
    console.log(this.currentStatus.nativeElement.value);
  }

  statusDisabled() {
    this.disableStatus = false;
  }

  lockStatus() {
    this.disableStatus = true;
  }

}
