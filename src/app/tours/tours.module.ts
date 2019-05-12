import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTourComponent } from './add-tour/add-tour.component';
import { SharedModule } from '../shared/shared.module';
import { ToursRoutingModule } from './tours.routing';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ToursRoutingModule
  ],
  declarations: [AddTourComponent, AddScheduleComponent]
})
export class ToursModule { }
