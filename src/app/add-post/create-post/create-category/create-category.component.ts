import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/model/category.model';
import { PostCategory } from 'src/app/model/postCategory.model';
import { PostCategoryService } from 'src/app/core/services/post-category.service';
import { element } from '@angular/core/src/render3/instructions';
import { Post } from 'src/app/model/post.model';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  // @Input() localCategories: PostCategory[] = [];
  @Input() post: Post;
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
    const sameCategory = this.post.categories.find((eachEle) => {
      return eachEle._id === choosedCategory._id;
    });
    if (sameCategory === undefined || sameCategory === null) {
      // this.localCategories.push(choosedCategory);
      this.post.categories.push(choosedCategory);
    }
    // console.log(this.localCategories);
  }

  onRemoveCategory(removedCategory: PostCategory) {
    // console.log(removedCategory);
    this.post.categories = this.post.categories.filter((eachEle) => {
      return eachEle.name !== removedCategory.name;
      // return eachEle._id !== removedCategory._id;
    });
    // console.log(this.localCategories);
  }
}
