import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { History } from './model/history';
import { BuycoinService } from './service/buycoin.service';
import { UserService } from './service/user.service';
import { Router } from '@angular/router';

@Injectable()
export class ReadComicGuard implements CanActivate {
  canRead: boolean;

  historys;
  total_coins;
  coin_id;
  uid;
  constructor(private userService: UserService, private buyCoinService: BuycoinService, private route: Router) {
    this.uid = this.userService.getCurrentUserId();
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return Observable.create((obs) => {
      obs.next(this.checkCoin());
    });
  }
  checkCoin() {
    this.buyCoinService.getHistory(this.uid).subscribe((val) => {
      this.historys = val.map((e) => {
        this.total_coins = e.payload.doc.data()['total_coin'];
        this.coin_id = e.payload.doc.id;

        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as History;
      });
    });

    if (this.total_coins >= 35) {
      this.buyCoinService.buyCoin(this.coin_id, 35);
      window.alert('remove 35 coin');
      return true;
    } else {
      window.alert('coin not enough!');
      this.route.navigate(['buycoin']);
      return false;
    }
  }
}
