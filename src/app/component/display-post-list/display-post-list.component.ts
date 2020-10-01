import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Post } from '../.././model/post';
import { PostService } from '../.././service/post.service';
import { UserService } from '../.././service/user.service';

@Component({
  selector: 'app-display-post-list',
  templateUrl: './display-post-list.component.html',
  styleUrls: ['./display-post-list.component.css'],
})
export class DisplayPostListComponent implements OnInit {
  @Input() comment: Post;

  usr_name: string;
  usr_id: string;

  like_num: number;
  like_check: number;
  like_display;
  canEdit = false;

  constructor(private postService: PostService, private userService: UserService) {
    this.usr_name = this.userService.getCurrentUserName();
    this.usr_id = this.userService.getCurrentUserId();
  }

  ngOnInit() {
    this.like_num = this.comment.vote_list.length;
    if (this.like_num == undefined) {
      this.like_num = 0;
    }

    this.checkDisplayLike();

    if (this.usr_name == this.comment.username) {
      this.canEdit = true;
    } else {
      this.canEdit = false;
    }
  }

  checkDisplayLike() {
    this.like_check = this.comment.vote_list.indexOf(this.usr_id);

    if (this.like_check != -1) {
      this.like_display = true;
    } else {
      this.like_display = false;
    }
    console.log('like display ', this.like_display);
  }

  likepost() {
    //  unlike
    if (this.like_display) {
      this.like_display = false;
      this.postService.unlikePost(this.comment.id, this.usr_id, this.comment.vote_list);
    }
    // like
    else {
      this.like_display = true;
      this.postService.likePost(this.comment.id, this.usr_id, this.comment.vote_list);
    }

    this.checkDisplayLike();
  }

  deletepost() {
    if (confirm('delete post')) {
      this.postService.deletePost(this.comment.id);
    }
  }
}
