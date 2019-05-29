import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostManagementComponent } from './post-management/post-management.component';
import { SharedModule } from '../shared/shared.module';
import { ManagerRoutingModule } from './manager.routing';
import { PostViewModule } from '../post-view/post-view.module';
import { PermissionManagementComponent } from './permission-management/permission-management.component';
import { TourManagementComponent } from './tour-management/tour-management.component';
import { DetailModalComponent } from './tour-management/detail-modal/detail-modal.component';
import { TourGeneralInfoComponent } from './tour-management/detail-modal/tour-general-info/tour-general-info.component';
import { TourMemberComponent } from './tour-management/detail-modal/tour-member/tour-member.component';
import { TourScheduleComponent } from './tour-management/detail-modal/tour-schedule/tour-schedule.component';
import { TourFeedbackComponent } from './tour-management/detail-modal/tour-feedback/tour-feedback.component';
import { TourPreparationComponent } from './tour-management/detail-modal/tour-preparation/tour-preparation.component';
import { TourFeedbackItemComponent } from './tour-management/detail-modal/tour-feedback/tour-feedback-item/tour-feedback-item.component';
import { PerformItemComponent } from './tour-management/detail-modal/tour-preparation/perform-item/perform-item.component';

@NgModule({
  imports: [CommonModule, SharedModule, ManagerRoutingModule, PostViewModule],
  declarations: [
    PostManagementComponent,
    PermissionManagementComponent,
    TourManagementComponent,
    DetailModalComponent,
    TourGeneralInfoComponent,
    TourMemberComponent,
    TourScheduleComponent,
    TourFeedbackComponent,
    TourPreparationComponent,
    TourFeedbackItemComponent,
    PerformItemComponent
  ],
  exports: [DetailModalComponent],
  entryComponents: [DetailModalComponent]
})
export class ManagerModule {}
