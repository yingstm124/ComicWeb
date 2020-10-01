import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Coin } from '.././model/coin';

@Injectable({ providedIn: 'root' })
export class BuycoinService {
  coins: number;

  constructor(private firestore: AngularFirestore) {}

  Initialhistory(user_id: string) {
    let default_coin = 0;
    let DocRef = this.firestore.collection('history');
    let history = {
      uid: user_id,
      his: new Array(),
      total_coin: default_coin,
    };
    return DocRef.add(history);
  }

  getHistory(uid: string) {
    let DocRef = this.firestore.collection('history', (val) => val.where('uid', '==', uid));
    return DocRef.snapshotChanges();
  }

  updatehistory(id: string, coin: number) {
    console.log('update history ' + coin + '. ' + id);
    let DocRef = this.firestore.collection('history').doc(id);
    let d = firebase.firestore.Timestamp.now();
    let data = {
      coins: coin,
      date: d,
    };
    return DocRef.update({
      his: firebase.firestore.FieldValue.arrayUnion(data),
    });
  }

  updateCoin(id: string, coin: number) {
    console.log('update coin ' + coin + ' by ID : ' + id);
    let DocRef = this.firestore.collection('history').doc(id);
    return DocRef.update({
      total_coin: firebase.firestore.FieldValue.increment(coin),
    });
  }

  buyCoin(id: string, coin: number) {
    console.log('buy coin ' + coin + ' by ID : ' + id);
    let DocRef = this.firestore.collection('history').doc(id);
    return DocRef.update({
      total_coin: firebase.firestore.FieldValue.increment(-coin),
    });
  }
}
