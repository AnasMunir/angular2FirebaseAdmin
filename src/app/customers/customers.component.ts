import { Component, OnInit } from '@angular/core';
import { CustomerService } from "../_services/customer.service";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: any;

  constructor(private cs: CustomerService) {
    this.getAllCustomers();
  }

  ngOnInit() {
    // this.getAllCustomers();
  }

  private getAllCustomers() {
    this.customers = this.cs.getAllCustomers();
    this.cs.getAllCustomers().subscribe(
      (data) => console.log(data));
  }

}
