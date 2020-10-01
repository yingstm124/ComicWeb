import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Chapters } from '../model/chapter';
import { Comic } from '../model/comic';
import { Bookmark } from '../model/bookmark';

@Injectable({ providedIn: 'root' })
export class SubscribeService {
  bookmarkID: string;

  constructor(private firestore: AngularFirestore) {}

  Initialbookmark(user_id: string) {
    let DocRef = this.firestore.collection('bookmark');
    let bookmark = {
      comicName: new Array(),
      uid: user_id,
    };
    return DocRef.add(bookmark);
  }

  Updatebookmark(id: string, comic: Comic) {
    console.log('updatebookmark ', id);
    let DocRef = this.firestore.collection('bookmark').doc(id);
    return DocRef.update({
      comicList: firebase.firestore.FieldValue.arrayUnion(comic),
    });
  }

  deleteComicList(id: string, comic: Comic) {
    console.log('remove comic in bookmark');
    let DocRef = this.firestore.collection('bookmark').doc(id);
    return DocRef.update({
      comicList: firebase.firestore.FieldValue.arrayRemove(comic),
    });
  }

  AddCurrentBookmarkID(id: string) {
    this.bookmarkID = id;
  }

  getCurrentBookmarkID() {
    return this.bookmarkID;
  }

  getbookmark(id: string) {
    console.log('get bookmark userID is ', id);
    let DocRef = this.firestore.collection('bookmark', (val) => val.where('uid', '==', id));
    return DocRef.snapshotChanges();
  }
}
