import { Component, OnInit, Input } from '@angular/core';
import { CardViewPost } from '../model/cardViewPost.model';

@Component({
  selector: 'app-card-view-post',
  templateUrl: './card-view-post.component.html',
  styleUrls: ['./card-view-post.component.scss']
})
export class CardViewPostComponent implements OnInit {

  @Input() inputPost: CardViewPost;

  constructor() { }

  ngOnInit() {
  }

}
