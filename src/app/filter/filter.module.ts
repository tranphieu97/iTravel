import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterByCategoryComponent } from './filter-by-category/filter-by-category.component';
import { SharedModule } from '../shared/shared.module';
import { FilterRoutingModule } from './filter.routing';
import { FullFilterControlComponent } from './full-filter-control/full-filter-control.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FilterRoutingModule
  ],
  declarations: [FilterByCategoryComponent, FullFilterControlComponent]
})
export class FilterModule { }
