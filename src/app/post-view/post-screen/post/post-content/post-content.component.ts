import { Component, OnInit, Input } from '@angular/core';
import { PostContent } from 'src/app/model/postContent.model';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss']
})
export class PostContentComponent implements OnInit {
  @Input() postContent: PostContent;

  constructor() { }

  ngOnInit() {
  }

}
