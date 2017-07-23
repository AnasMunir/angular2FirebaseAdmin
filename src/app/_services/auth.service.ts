import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@Injectable()
export class AuthService {

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, ) {


  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  async login(email: string, password: string) {
    const user = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    console.log("user", user);
    // const userPromise = await this.db.object('users/' + user.uid).take(1).toPromise()
    let isUserAdmin: boolean;
    const userSubscription = this.db.object('users/' + user.uid)
      .subscribe((userData) => {
        console.log("userData", userData);
        if (userData.user_type === "admin") {
          console.log("user is an admin");
          isUserAdmin = true;
        } else {
          console.log("user is not admin");
          this.logout();
          userSubscription.unsubscribe();
          isUserAdmin = false;
        }
      }).add(() => {
        return isUserAdmin;
      })
  }

}
