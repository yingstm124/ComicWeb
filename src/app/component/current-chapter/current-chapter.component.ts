import { Component, OnInit } from '@angular/core';
import { ComicService } from '../../service/comic.service';
import { UserService } from '../../service/user.service';
import { PostService } from '../../service/post.service';
import { Comic } from '../../model/comic';
import { Post } from '../../model/post';
import { Chapters } from '../../model/chapter';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import * as firebase from 'firebase/app';
import "firebase/storage";

@Component({
  selector: 'app-current-chapter',
  templateUrl: './current-chapter.component.html',
  styleUrls: ['./current-chapter.component.css']
})
export class CurrentChapterComponent implements OnInit {

  chapterId;
  chapterLock;

  display_chapter;
  length_chapter;
  chapter_name;
  chapters;



  Hotcomment;
  Newcomment;

  comic: Comic;
  name:string;

  msgForm: FormGroup;
  msg:string;

  
  constructor(
    private comicService: ComicService,
    private route: Router,
    private act_route: ActivatedRoute,
    private userService: UserService,
    private postService: PostService,
    private formBuilder: FormBuilder,
  ) {
    this.name = this.userService.getCurrentUserName();
    this.comic = this.comicService.getCurrentComic(); 
  }

  ngOnInit() {

    this.act_route.paramMap.subscribe(params => {
      this.chapterId = +params.get('chapterId');
      console.log("paramap " ,this.chapterId);

      this.comicService.getChapter(this.comic.name).subscribe(val => {
      this.chapters = val.map(
        e => {
          this.display_chapter = e.payload.doc.data()["chapter"+this.chapterId];
          this.length_chapter  = e.payload.doc.data()["cover"];
          this.chapterLock = this.length_chapter.length - 1;
          this.chapter_name = e.payload.doc.data()["name"];

          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Chapters
        })
      });
    });

    

    this.msgForm = this.formBuilder.group({
      'Msg': [this.msg, []]
    });

    
    this.getHotComment();
    this.getNewComment();

  }


  getHotComment(){
    this.postService.getHotPost().subscribe(val => {
      this.Hotcomment = val.map(
        e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Post
        }
      )
    });
  }

  getNewComment(){
    this.postService.getPost().subscribe( val => {
      this.Newcomment = val.map(
        e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Post
        }
      )
    });
  }
  

  Back(){
    this.chapterId -= 1;
    console.log("Back ",this.chapterId);
    this.route.navigate(['/currentChapter', this.chapterId]);
    
  }

  Next(){

    this.chapterId += 1;

    if(this.chapterId == this.chapterLock){
      this.route.navigate(['/currentChapterLock']);      
    }
    else {
      console.log("Next ",this.chapterId);
      this.route.navigate(['/currentChapter', this.chapterId]);
    }
    
  
  }

  post(){
    if(confirm("Are you sure to post")){
      this.postService.addPost(
        this.name, this.msgForm.value.Msg
      );

      this.msg = "";
      }
    
  
  }



}