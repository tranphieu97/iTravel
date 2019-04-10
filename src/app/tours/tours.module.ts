import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTourComponent } from './add-tour/add-tour.component';
import { SharedModule } from '../shared/shared.module';
import { ToursRoutingModule } from './tours.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ToursRoutingModule
  ],
  declarations: [AddTourComponent]
})
export class ToursModule { }
