import { Component, OnInit } from '@angular/core';
import { Comic } from '../../model/comic';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { ComicService } from '../../service/comic.service';


@Component({
  selector: 'app-display-comic',
  templateUrl: './display-comic.component.html',
  styleUrls: ['./display-comic.component.css']
})
export class DisplayComicComponent implements OnInit {

  @Input() comic : Comic;

  chapter;
  sublist;
  vote_num;

  constructor(
    private route: Router,
    private comicService: ComicService,
  ) {
    
  }

  ngOnInit() {

    this.sublist = this.comic.subnum;
    this.vote_num = this.comic.votenum;
    
    if(this.vote_num == undefined){
      this.vote_num = 0;
    }
    if(this.sublist == undefined){
      this.sublist = 0;
    }
  }


}