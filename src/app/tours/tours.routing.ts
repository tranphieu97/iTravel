import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTourComponent } from './add-tour/add-tour.component';

const routes: Routes = [
    { path: 'add-tour', component: AddTourComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [],
    declarations: [],
})
export class ToursRoutingModule { }