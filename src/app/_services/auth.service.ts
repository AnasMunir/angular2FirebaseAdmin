import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@Injectable()
export class AuthService {

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, ) {


  }

  logout() {
    localStorage.removeItem('admin');
    return this.afAuth.auth.signOut();
  }

  async login(email: string, password: string) {
    return await this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  checkIfAdmin(uid) {
    return this.db.object('users/' + uid)
      .map((userData) => {
        if (userData.user_type === "admin") {
          console.log("user is an admin");
          // isUserAdmin = true;
          localStorage.setItem('admin', JSON.stringify(userData));
          return true;
        } else {
          console.log("user is not admin");
          // this.logout();
          // userSubscription.unsubscribe();
          // isUserAdmin = false;
          return false;
        }
      })
  }

  changePassword(password) {
    const user = this.afAuth.auth.currentUser
    return user.updatePassword(password);
  }

}
