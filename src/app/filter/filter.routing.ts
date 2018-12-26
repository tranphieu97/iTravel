import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilterByCategoryComponent } from './filter-by-category/filter-by-category.component';

const routes: Routes = [
    {
        path: ':category/:kind',
        component: FilterByCategoryComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FilterRoutingModule { }
