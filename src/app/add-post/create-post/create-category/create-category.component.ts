import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/model/category.model';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  @Input() categories: Category;
  constructor() { }

  ngOnInit() {
  }

}
