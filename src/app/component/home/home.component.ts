import { Component, OnInit } from '@angular/core';
import { ComicService } from '../../service/comic.service';

import { Comic } from '../../model/comic';
import { History } from '../../model/history';

import { AngularFireAuth } from '@angular/fire/auth';
import { BuycoinService } from '../.././service/buycoin.service';
import { UserService } from '../.././service/user.service';
import { SubscribeService } from '../../service/subscribe.service';
import { Bookmark } from '../../model/bookmark';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Observable, Subject, combineLatest } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Genres = [
    "All",
    "Drama",
    "Romance",
    "Comedy",
    "Fantasy",
    "Action",
    "Horror"
  ];


  username: string;
  uid:string
  coins;
  coin:string;
  bookmark;
  total_coin;
  

  displaysearch = false;
  searchterm: string;
  startAt = new Subject();
  endAt = new Subject();
  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();
  search_item;

  genre_search = "ALL";
  display_search = false;


  constructor(
    private comicService : ComicService,
    private afAuth: AngularFireAuth,
    private buyCoinService: BuycoinService,
    private userService: UserService,
    private subscribeService: SubscribeService,
    private route: Router,
    private formBuilder: FormBuilder,

  ) { 

  }

  ngOnInit() {

    // combineLatest searching word !

    combineLatest(this.startobs, this.endobs).subscribe(
      (val) => { this.comicService.SearchComic(val[0], val[1]).subscribe( search => {
        this.search_item = search
        })
      }
    )

    this.afAuth.auth.onAuthStateChanged((user) => {
      if(user){
        var displayname = user.displayName;
        var uid = user.uid;

        this.username = displayname;
        this.uid = uid;

        this.userService.addCurrentUserId(this.uid);
        this.userService.addCurrentUserName(this.username);
      
      }
    });

    console.log(this.coin);
    
  }

  searching($event){
    let q = $event.target.value.toLowerCase();

    if(q == ""){
      this.displaysearch = false;
    }
    else{
      this.displaysearch = true;
      this.startAt.next(q);
      this.endAt.next(q + '\uf8ff');
    }
    
    console.log(this.displaysearch);
    
  }

  selectComic(comic:Comic){
    this.route.navigate(["chapter"]);
    this.comicService.addCurrentComic(comic);
  }

}



