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
    const user = await this.afAuth.auth.signInWithEmailAndPassword(email, password)
    console.log("user", user);
  }

}
