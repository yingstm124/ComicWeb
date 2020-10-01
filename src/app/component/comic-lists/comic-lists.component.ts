import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Comic } from '../../model/comic';
import { Router } from '@angular/router';
import { ComicService } from '../../service/comic.service';
import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-comic-lists',
  templateUrl: './comic-lists.component.html',
  styleUrls: ['./comic-lists.component.css'],
})
export class ComicListsComponent implements OnInit {
  @Input() genre: string;
  comics;

  constructor(private route: Router, private comicService: ComicService) {}

  ngOnInit() {
    if (this.genre == 'All') {
      this.comicService.getAllComic().subscribe((val) => {
        this.comics = val.map((e) => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          } as Comic;
        });
      });
    } else {
      this.comicService.getComic(this.genre).subscribe((val) => {
        this.comics = val.map((e) => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data(),
          } as Comic;
        });
      });
    }
  }

  selectComic(comic: Comic) {
    this.route.navigate(['chapter']);
    this.comicService.addCurrentComic(comic);
  }
}
