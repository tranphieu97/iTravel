import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdditionalRoutingModule } from './additionnal.routing';
import { FeedbackComponent } from './feedback/feedback.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdditionalRoutingModule
  ],
  declarations: [FeedbackComponent]
})
export class AdditionalModule { }
