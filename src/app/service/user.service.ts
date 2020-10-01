import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UserService {
  current_uid: string;
  current_username: string;

  constructor(private afAuth: AngularFireAuth, private route: Router) {}

  addCurrentUserId(uid: string) {
    this.current_uid = uid;
  }

  addCurrentUserName(usrname: string) {
    this.current_username = usrname;
  }

  getCurrentUserId() {
    if (this.current_uid != undefined) {
      return this.current_uid;
    } else {
      console.log('user is undefine');
      return undefined;
    }
  }

  getCurrentUserName() {
    if (this.current_username != undefined) {
      return this.current_username;
    } else {
      console.log('user is undefine');
      return undefined;
    }
  }

  logout() {
    this.afAuth.auth
      .signOut()
      .then(function () {
        console.log('logout success!');
        this.route.navigate(['']);
      })
      .catch(function (error) {
        window.alert(error.Message);
      });
  }
}
