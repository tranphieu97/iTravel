import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/model/category.model';
import { PostCategory } from 'src/app/model/postCategory.model';
import { PostCategoryService } from 'src/app/core/services/post-category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  @Input() localCategories: PostCategory[] = [];
  private allCategories: PostCategory[] = [];

  constructor(private postCategoryService: PostCategoryService) { }

  ngOnInit() {
    this.postCategoryService.newCategoriesUpdated.asObservable()
      .subscribe(() => {
        // update allCategories same as data on service
        this.allCategories = this.postCategoryService.allCategories;
        console.log(this.allCategories);
      });
    this.postCategoryService.getAllCategories();
  }
}
