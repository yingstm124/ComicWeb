import { Component, OnInit, Input } from '@angular/core';
import { Comic } from '../.././model/comic';
import { Router } from '@angular/router';
import { ComicService } from '../../service/comic.service';

@Component({
  selector: 'app-display-comic-search',
  templateUrl: './display-comic-search.component.html',
  styleUrls: ['./display-comic-search.component.css'],
})
export class DisplayComicSearchComponent implements OnInit {
  @Input() comic: Comic;

  constructor(private route: Router) //private comicService: ComicService,
  {}

  ngOnInit() {}
}
