import { Component, OnInit, Input } from '@angular/core';
import { PostContent } from 'src/app/model/postContent.model';

@Component({
  selector: 'app-create-post-content',
  templateUrl: './create-post-content.component.html',
  styleUrls: ['./create-post-content.component.scss']
})

export class CreatePostContentComponent implements OnInit {
  @Input() postContents: PostContent[] = [];

  constructor() { }

  ngOnInit() {

  }

}
