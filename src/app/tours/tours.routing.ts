import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTourComponent } from './add-tour/add-tour.component';
import { TourManagementComponent } from './tour-management/tour-management.component';

const routes: Routes = [
    { path: 'add-tour', component: AddTourComponent },
    { path: 'manager', component: TourManagementComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [],
    declarations: [],
})
export class ToursRoutingModule { }
