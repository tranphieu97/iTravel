import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTourComponent } from './add-tour/add-tour.component';
import { SharedModule } from '../shared/shared.module';
import { ToursRoutingModule } from './tours.routing';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { AddPreparationComponent } from './add-preparation/add-preparation.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ToursRoutingModule
  ],
  declarations: [AddTourComponent, AddScheduleComponent, AddPreparationComponent]
})
export class ToursModule { }
