import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/model/category.model';
import { PostCategory } from 'src/app/model/postCategory.model';
import { PostCategoryService } from 'src/app/core/services/post-category.service';
import { element } from '@angular/core/src/render3/instructions';

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
      });
    this.postCategoryService.getAllCategories();
  }

  onSelectCategory(choosedCategory: PostCategory) {
    const foundResult = this.localCategories.find((eachEle) => {
      return eachEle._id === choosedCategory._id;
    });
    if (foundResult === undefined || foundResult === null) {
      this.localCategories.push(choosedCategory);
    }
  }

  onRemoveCategory(removedCategory: PostCategory) {
    // console.log(removedCategory);
    this.localCategories = this.localCategories.filter((eachEle) => {
      return eachEle.name !== removedCategory.name;
      // return eachEle._id !== removedCategory._id;
    });
  }
}
