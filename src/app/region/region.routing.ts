import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilterbyRegionComponent } from './filterby-region/filterby-region.component';

const routes: Routes = [
    {
        path: ':part',
        component: FilterbyRegionComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegionRoutingModule { }

