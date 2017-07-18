import { Component, OnInit } from '@angular/core';
import { CustomerService } from "../_services/customer.service";
import { ParamMap, ActivatedRoute } from "@angular/router";
// import { QRCodeComponent } from 'ng2-qrcode';
import { QRCodeComponent } from 'angular2-qrcode';
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

  constructor(private cs: CustomerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCustomerDetails();
  }

  private async getCustomerDetails() {
    let id = this.route.snapshot.params['id'];
    this.qrcodeValue = this.route.snapshot.params['id'];
    console.log("id", id);
    // this.customerDetail = this.cs.getCustomerDetails(id)/*.take(1).toPromise();*/
    //   .subscribe((data) => console.log(data));
    // console.log(this.customerDetail);
    this.customerDetail = this.cs.getCustomerDetails(id)/*.subscribe((data) => {
      console.log("subscription", data);
    });*/
    this.videos = this.cs.getCutomerVideos(id);
    
  }

}
