import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTourComponent } from './add-tour/add-tour.component';
import { SharedModule } from '../shared/shared.module';
import { ToursRoutingModule } from './tours.routing';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { AddPreparationComponent } from './add-preparation/add-preparation.component';
import { TourManagementComponent } from './tour-management/tour-management.component';
import { DetailModalComponent } from './tour-management/detail-modal/detail-modal.component';
import { TourGeneralInfoComponent } from './tour-management/detail-modal/tour-general-info/tour-general-info.component';
import { TourMemberComponent } from './tour-management/detail-modal/tour-member/tour-member.component';
import { TourScheduleComponent } from './tour-management/detail-modal/tour-schedule/tour-schedule.component';
import { TourFeedbackComponent } from './tour-management/detail-modal/tour-feedback/tour-feedback.component';
import { TourPreparationComponent } from './tour-management/detail-modal/tour-preparation/tour-preparation.component';
import { TourFeedbackItemComponent } from './tour-management/detail-modal/tour-feedback/tour-feedback-item/tour-feedback-item.component';
import { PerformItemComponent } from './tour-management/detail-modal/tour-preparation/perform-item/perform-item.component';
import { TourBuildingComponent } from './tour-building/tour-building.component';
import { RightFeedbackComponent } from './tour-building/right-feedback/right-feedback.component';
import { SendFeedbackComponent } from './tour-building/right-feedback/send-feedback/send-feedback.component';

@NgModule({
  imports: [CommonModule, SharedModule, ToursRoutingModule],
  declarations: [
    AddTourComponent,
    AddScheduleComponent,
    AddPreparationComponent,
    TourManagementComponent,
    DetailModalComponent,
    TourGeneralInfoComponent,
    TourMemberComponent,
    TourScheduleComponent,
    TourFeedbackComponent,
    TourPreparationComponent,
    TourFeedbackItemComponent,
    PerformItemComponent,
    TourBuildingComponent,
    RightFeedbackComponent,
    SendFeedbackComponent
  ],
  exports: [DetailModalComponent],
  entryComponents: [DetailModalComponent]
})
export class ToursModule {}
