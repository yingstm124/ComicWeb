import { Component, OnInit } from '@angular/core';
import { Chapters } from '../../model/chapter';
import { Comic } from '../../model/comic';
import { Router } from '@angular/router';
import { SubscribeService } from '../../service/subscribe.service';
import { UserService } from '../../service/user.service';
import { ComicService } from '../../service/comic.service';
import { Bookmark } from '../../model/bookmark';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.css'],
})
export class MylistComponent implements OnInit {
  name: string;
  uid: string;
  bookmarks;
  bookmarkId: string;
  comic_lists;

  genres = ['All', 'Drama', 'Romance', 'Comedy', 'Fantasy', 'Action', 'Horror'];

  selected = 'All';

  constructor(
    private subscribeService: SubscribeService,
    private comicService: ComicService,
    private userService: UserService,
    private route: Router,
  ) {
    this.name = this.userService.getCurrentUserName();

    console.log(this.uid);
  }

  ngOnInit() {
    this.uid = this.userService.getCurrentUserId();
    this.subscribeService.getbookmark(this.uid).subscribe((val) => {
      this.bookmarks = val.map((e) => {
        (this.comic_lists = e.payload.doc.data()['comicList']), (this.bookmarkId = e.payload.doc.id);
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        } as Bookmark;
      });
    });
  }

  select(genre: string) {
    this.selected = genre;
    // window.alert(this.selected);
  }

  selectComic(comic: Comic) {
    console.log('select comic ', comic.name);

    this.comicService.addCurrentComic(comic);
    this.route.navigate(['chapter']);
  }

  DeleteComic(comic: Comic) {
    if (confirm('delete ' + comic.name)) {
      this.subscribeService.deleteComicList(this.bookmarkId, comic);
      this.comicService.deleteComicSubList(comic.id, this.uid);
    }
    // window.alert('delete comic');
  }
}
