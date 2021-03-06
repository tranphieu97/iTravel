import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTourComponent } from './add-tour/add-tour.component';
import { SharedModule } from '../shared/shared.module';
import { ToursRoutingModule } from './tours.routing';
import { AddScheduleComponent } from './add-tour/add-schedule/add-schedule.component';
import { AddPreparationComponent } from './add-tour/add-preparation/add-preparation.component';
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
import { TourViewComponent } from './tour-view/tour-view.component';
import { ReviewerFeedbackComponent } from './tour-building/reviewer-feedback/reviewer-feedback.component';
import { TourOwnerControlComponent } from './tour-building/tour-owner-control/tour-owner-control.component';
import { TourRegisteringComponent } from './tour-registering/tour-registering.component';
import { RegisteringFormComponent } from './tour-registering/registering-form/registering-form.component';
import { TourEditingComponent } from './tour-management/tour-editing/tour-editing.component';
import { ReopenModalComponent } from './tour-management/reopen-modal/reopen-modal.component';
import { LocationEditingComponent } from './tour-management/tour-editing/location-editing/location-editing.component';
import { ScheduleEditingComponent } from './tour-management/tour-editing/schedule-editing/schedule-editing.component';
import { TimelineEditingComponent } from './tour-management/tour-editing/timeline-editing/timeline-editing.component';
import { PreparationEditingComponent } from './tour-management/tour-editing/preparation-editing/preparation-editing.component';
import { AddPreformerComponent } from './tour-management/tour-editing/add-preformer/add-preformer.component';

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
    TourViewComponent,
    RightFeedbackComponent,
    SendFeedbackComponent,
    ReviewerFeedbackComponent,
    TourOwnerControlComponent,
    TourRegisteringComponent,
    RegisteringFormComponent,
    ReopenModalComponent,
    TourEditingComponent,
    LocationEditingComponent,
    ScheduleEditingComponent,
    TimelineEditingComponent,
    PreparationEditingComponent,
    AddPreformerComponent
  ],
  exports: [DetailModalComponent],
  entryComponents: [DetailModalComponent, ReopenModalComponent, TourEditingComponent]
})
export class ToursModule {}
