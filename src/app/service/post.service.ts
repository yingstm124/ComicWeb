import { Injectable } from '@angular/core';
import { Post } from '.././model/post';
import { AngularFirestore } from '@angular/fire/firestore'
import * as firebase from 'firebase/app';


@Injectable(
  { providedIn: 'root' }
)

export class PostService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  getHotPost(){
    let DocRef = this.firestore.collection('post', val => 
      val.orderBy('votenum', 'desc').limit(5));
    return DocRef.snapshotChanges();
  }
  getPost(){
    let DocRef = this.firestore.collection('post', val =>
    val.orderBy('date', 'desc'));
    return DocRef.snapshotChanges();
  }

  likePost(id:string, userId:string, vote_lst){
    console.log("updateVotelist");
    let DocRef = this.firestore.collection('post').doc(id);
    return DocRef.update({
      vote_list: firebase.firestore.FieldValue.arrayUnion(userId),
      votenum: vote_lst.length
    });
  }

  unlikePost(id:string, userId:string, vote_lst){
    console.log("updateVotelist");
    let DocRef = this.firestore.collection('post').doc(id);
    return DocRef.update({
      vote_list: firebase.firestore.FieldValue.arrayRemove(userId),
      votenum: vote_lst.length
    });
  }

  
  addPost(name:string, comment:string){
    let DocRef = this.firestore.collection('post');
    let post = {
      username: name,
      comment: comment,
      date: firebase.firestore.Timestamp.now(),
      votenum: 0,
      vote_list: new Array
    }
    return DocRef.add(post);
  }

  deletePost(id:string){
    let DocRef = this.firestore.collection('post').doc(id);
    return DocRef.delete();
  }




}