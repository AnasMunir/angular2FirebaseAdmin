import { Component, OnInit } from '@angular/core';
import { CustomerService } from "../_services/customer.service";
import { ParamMap, ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  customerDetail: any;

  constructor(private cs: CustomerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCustomerDetails();
  }

  private async getCustomerDetails() {
    let id = this.route.snapshot.params['id'];
    console.log("id", id);
    this.customerDetail = await this.cs.getCustomerDetails(id).take(1).toPromise();
    console.log(this.customerDetail);
    this.cs.getCustomerDetails(id).subscribe((data) => {
      console.log("subscription", data);
    })
    
  }

}
