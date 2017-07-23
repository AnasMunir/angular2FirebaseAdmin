import { Component, OnInit } from '@angular/core';
import { CustomerService } from "../_services/customer.service";
import { Router } from "@angular/router";
import { AuthService } from "../_services/auth.service";
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: any;
  customerObject: any;

  constructor(
    private cs: CustomerService,
    private router: Router,
    private auth: AuthService) {

    this.getAllCustomers();
  }

  ngOnInit() {
    // this.getAllCustomers();
  }

  private getAllCustomers() {
    this.customers = this.cs.getAllCustomers();
  }

  private async showDetails(index) {
    // this.cs.getAllCustomers().subscribe(
    //   (data) => console.log(data));
    console.log("index", index);
    const details = await this.cs.getAllCustomers().take(1).toPromise()
    console.log(details[index]);
    this.customerObject = details[index];
    console.log(details[index]['$key']);
    // .then((data) => console.log(data))
    // .catch(error => console.log(error));
  }

  async gotoDetail(key) {
    // const details = await this.cs.getAllCustomers().take(1).toPromise()
    // console.log(details[index]);
    console.log("key", key);
    this.router.navigate(['/customer', key]);
  }

  logout() {
    this.auth.logout()
  }

}
