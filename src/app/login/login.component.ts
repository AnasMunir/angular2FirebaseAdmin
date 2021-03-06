import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from "../_services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  loginForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
    })
  }

  ngOnInit() {
    this.auth.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  async login() {
    try {
      const user = await this.auth.login(this.loginForm.value.email, this.loginForm.value.password)
      console.log("user", user);
      this.auth.checkIfAdmin(user.uid)
        .subscribe(
          isUserAdmin => {
            console.log("isUserAdmin", isUserAdmin);
            if (isUserAdmin) {
              console.log(this.returnUrl);
              this.router.navigate([this.returnUrl]);
            } else {
              this.auth.logout();
            }
          },
          error => {
            console.error("error", error);
          }
        )

      // console.log("isUserAdmin", isUserAdmin);
    } catch (error) {
      console.error(error);
    }
  }

}
