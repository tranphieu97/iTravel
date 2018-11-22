import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.component.html',
  styleUrls: ['./create-tag.component.scss']
})
export class CreateTagComponent implements OnInit {
  @Input() tags: Array<string>;
  constructor() { }

  ngOnInit() {
  }

}
