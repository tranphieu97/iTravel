import { Component, OnInit } from '@angular/core';
import { CardViewPost } from '../../model/cardViewPost.model';
import { ServerService } from '../../core/services/server.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  cardViewPosts: CardViewPost[];

  constructor(private server: ServerService) { }

  ngOnInit() {
    this.server.GetCardViewPost().subscribe((result) => {
      this.cardViewPosts = result;
    });
  }

}
