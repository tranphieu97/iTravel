import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdditionalRoutingModule } from './additionnal.routing';
import { FeedbackComponent } from './feedback/feedback.component';
import { PoliciesComponent } from './policies/policies.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdditionalRoutingModule
  ],
  declarations: [FeedbackComponent, PoliciesComponent]
})
export class AdditionalModule { }
