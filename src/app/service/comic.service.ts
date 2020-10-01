import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Chapters } from '../model/chapter';
import { Comic } from '../model/comic';

@Injectable({ providedIn: 'root' })
export class ComicService {
  comicName: string;
  comicCurrent: Comic;
  comic_search: string;

  constructor(private firestore: AngularFirestore) {}

  getAllComic() {
    console.log('get All Comic');
    let DocRef = this.firestore.collection('comic');
    return DocRef.snapshotChanges();
  }

  getComic(genre: string) {
    console.log('get ', genre, ' Comic');
    let DocRef = this.firestore.collection('comic', (val) => val.where('genre', '==', genre));
    return DocRef.snapshotChanges();
  }

  getComicByID(id: string) {
    console.log('get comic by ', id);
    let DocRef = this.firestore.collection('comic', (val) => val.where('id', '==', id));
    return DocRef.snapshotChanges();
  }

  getComicByName(name: string) {
    let DocRef = this.firestore.collection('comic', (val) => val.where('name', '==', name));
    return DocRef.snapshotChanges();
  }

  subComic(id: string, userId: string) {
    console.log('update subscriber! ', id, 'user ', userId);
    let DocRef = this.firestore.collection('comic').doc(id);
    return DocRef.update({
      sub_list: firebase.firestore.FieldValue.arrayUnion(userId),
    });
  }
  unsubComic(id: string, userId: string) {
    console.log('update subscriber! ', id, 'user ', userId);
    let DocRef = this.firestore.collection('comic').doc(id);
    return DocRef.update({
      sub_list: firebase.firestore.FieldValue.arrayRemove(userId),
    });
  }

  RecommentComic(genre: string) {
    console.log('recommend ', genre);
    let DocRef = this.firestore.collection('comic', (val) => val.orderBy('subnum').where('genre', '==', genre));
    return DocRef.snapshotChanges();
  }

  SearchComic(start, end) {
    console.log('Search start = ', start, 'end = ', end);
    let DocRef = this.firestore.collection('comic', (val) => val.limit(5).orderBy('name').startAt(start).endAt(end));
    return DocRef.valueChanges();
  }

  getChapter(name: string) {
    console.log('get Chapter with currentname = ', name);
    let DocRef = this.firestore.collection('chapter', (val) => val.where('name', '==', name));
    return DocRef.snapshotChanges();
  }

  likeCoimic(id: string, userId: string) {
    console.log('like comic');
    let DocRef = this.firestore.collection('comic').doc(id);
    return DocRef.update({
      vote_list: firebase.firestore.FieldValue.arrayUnion(userId),
    });
  }

  unlikeCoimic(id: string, userId: string) {
    console.log('unlike comic');
    let DocRef = this.firestore.collection('comic').doc(id);
    return DocRef.update({
      vote_list: firebase.firestore.FieldValue.arrayRemove(userId),
    });
  }

  updateLike(id: string, vote_lst) {
    let DocRef = this.firestore.collection('comic').doc(id);
    return DocRef.update({
      votenum: vote_lst.length,
    });
  }

  updateSubList(id: string, sub_lst) {
    let DocRef = this.firestore.collection('comic').doc(id);
    return DocRef.update({
      subnum: sub_lst.length,
    });
  }

  deleteComicSubList(id: string, userId: string) {
    console.log('delete sub list of ', userId);
    let DocRef = this.firestore.collection('comic').doc(id);
    return DocRef.update({
      sub_list: firebase.firestore.FieldValue.arrayRemove(userId),
    });
  }

  addCurrentComic(comic: Comic) {
    this.comicCurrent = comic;
  }

  getCurrentComic() {
    return this.comicCurrent;
  }

  getComicSearch() {
    return this.comic_search;
  }
}
