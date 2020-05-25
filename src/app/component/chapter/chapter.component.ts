import { Component, OnInit } from '@angular/core';
import { ComicService } from '../../service/comic.service';
import { Input } from '@angular/core';
import { Chapters } from '../../model/chapter';
import { Comic } from '../../model/comic';
import { Post } from '../../model/post';
import { Router, ActivatedRoute } from '@angular/router';
import { SubscribeService } from '../../service/subscribe.service';
import { PostService } from '../../service/post.service';
import { UserService } from '../../service/user.service';
import { Bookmark } from '../../model/bookmark';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {

  comic:Comic;
  comics;
  comic_sublist;
  comic_subnum;
  comic_votelist;
  comic_votenum;

  chapterId;
  coverChap;
  desChap;
  subscribe;
  bookmarkId;
  recommend;

  chapters;
  bookmark;
  display_sub;
  check_sub;
  display_like;
  check_like;

  uid:string;
  lock = 2;

  constructor(
    private comicService: ComicService,
    private route : Router,
    private act_route: ActivatedRoute,
    private subscribeService: SubscribeService,
    private userService: UserService,
    private postService: PostService,
  
  ) { 
    this.comic = this.comicService.getCurrentComic();
    this.uid = this.userService.getCurrentUserId();
  }

  ngOnInit() {
    this.chapterId = this.act_route.snapshot.params.chapterId;
    this.refreshcomic();

  }

  refreshcomic(){
    
    this.comicService.getChapter(this.comic.name).subscribe(val => {
      this.chapters = val.map(
        e => {
          this.coverChap = e.payload.doc.data()['cover'],
          this.subscribe = e.payload.doc.data()['subscribe'],
          this.desChap = e.payload.doc.data()['description']
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Chapters
        }
      )
    });

    this.comicService.getComicByName(this.comic.name).subscribe( val => {
      this.comics = val.map(
        e => {
          this.comic_votelist = e.payload.doc.data()['vote_list'],
          this.comic_votenum = this.comic_votelist.length;
          this.comic_sublist = e.payload.doc.data()['sub_list'],
          this.comic_subnum = this.comic_sublist.length;
          
          this.comicService.updateLike(this.comic.id,this.comic_votelist);
          this.comicService.updateSubList(this.comic.id, this.comic_sublist)
          
          this.checksublist();
          this.checkvotelist();
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Comic
        }
      )
    });

    

    this.getRecommentComic();

    //console.log("UID = ",this.uid);

    this.subscribeService.getbookmark(this.uid).subscribe( val =>
    {
      this.bookmark = val.map(
        e => {
          this.bookmarkId = e.payload.doc.id
          return{
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Bookmark
        } 
      )
    });
  }

  checksublist(){
    
    this.check_sub = this.comic_sublist.indexOf(this.uid);
    if(this.check_sub != -1){
      this.display_sub = true;
    }
    else{
      this.display_sub = false;
    }

  }

  checkvotelist(){

    this.check_like = this.comic_votelist.indexOf(this.uid);
    if(this.check_like != -1){
      this.display_like = true;
    }
    else{
      this.display_like = false;
    }
  }

  getRecommentComic(){
    this.comicService.RecommentComic(this.comic.genre).subscribe(
      val => {
        this.recommend = val.map(
          e => {
            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data()
            } as Comic
          }
        )
      }
    );
  }


  ReadingComic(indexChap:number){
    this.route.navigate(['currentChapter']);
  }
  
  AddMyList(){
    // un sub
    if(this.display_sub){
      this.display_sub = false;
      this.checksublist();

      this.comicService.unsubComic(this.comic.id, this.uid);
      this.subscribeService.AddCurrentBookmarkID(this.bookmarkId);
      this.subscribeService.deleteComicList(this.bookmarkId, this.comic);
      window.alert("unsubscribe ",this.comic.name);
    }
    // subscribe
    else{
      this.display_sub = true;
      this.checksublist();

      this.comicService.subComic(this.comic.id, this.uid);
      this.subscribeService.AddCurrentBookmarkID(this.bookmarkId);
      this.subscribeService.Updatebookmark(this.bookmarkId, this.comic);
      window.alert("subscribe ",this.comic.name);   
    }
  }

  like(){
    // unlike
    if(this.display_like){
      this.display_like = false;
      this.checkvotelist();

      this.comicService.unlikeCoimic(this.comic.id, this.uid);
      window.alert("unLike ",this.comic.name);
    }
    // like
    else{
      this.display_like = true;
      this.checkvotelist();

      this.comicService.likeCoimic(this.comic.id, this.uid);
      window.alert("Like ",this.comic.name);
    }
    
    

  }

  selectComic(comic:Comic){
    console.log("select comic ",comic.name);
    
    this.comic = comic;
    this.refreshcomic();

  }

}