import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilterByCategoryComponent } from './filter-by-category/filter-by-category.component';
import { FullFilterControlComponent } from './full-filter-control/full-filter-control.component';

const routes: Routes = [
    {
        path: ':category/:kind',
        component: FilterByCategoryComponent
    },
    {
        path: 'all',
        component: FullFilterControlComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FilterRoutingModule { }
