import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  isLogined;

  constructor(private afAuth: AngularFireAuth, private route: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return Observable.create((obs) => {
      this.afAuth.auth.onAuthStateChanged((user) => {
        if (user) {
          this.isLogined = true;
        } else {
          this.isLogined = false;
          this.route.navigate(['login']);
        }
        obs.next(this.isLogined);
      });
    });
  }

  ngOnInit() {}
}
