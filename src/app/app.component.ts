import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './service/user.service';
import { History } from './model/history';
import { BuycoinService } from './service/buycoin.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  opened: boolean;
  greeting = '~ Wellcome to comic.Store ~';
  displayname: string;
  name: string;
  email: string;
  isLoggedIn = false;
  profileImg;

  coins;
  total_coin;

  constructor(
    private afAuth: AngularFireAuth,
    private route: Router,
    private userService: UserService,
    private buycoinService: BuycoinService,
  ) {}

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;

        this.name = displayName;
        this.email = email;
        this.isLoggedIn = true;
        this.greeting = undefined;

        this.displayname = this.name;
        // this.profileImg = photoURL

        // console.log("profile image",this.profileImg);

        this.buycoinService.getHistory(user.uid).subscribe((val) => {
          this.coins = val.map((e) => {
            this.total_coin = e.payload.doc.data()['total_coin'];
            return { id: e.payload.doc.id, ...e.payload.doc.data() } as History;
          });
        });
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  logout() {
    if (confirm('logout')) {
      this.userService.logout();
      window.alert('logout');
    }
    this.displayname = '';
  }
}
