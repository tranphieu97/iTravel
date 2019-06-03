import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTourComponent } from './add-tour/add-tour.component';
import { TourManagementComponent } from './tour-management/tour-management.component';
import { TourBuildingComponent } from './tour-building/tour-building.component';

const routes: Routes = [
    { path: 'add-tour', component: AddTourComponent },
    { path: 'manager', component: TourManagementComponent },
    { path: 'building/:id', component: TourBuildingComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [],
    declarations: [],
})
export class ToursRoutingModule { }
