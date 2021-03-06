import { TourSchedule } from './tour-schedule.model';
import { TourPreparation } from './tour-preparation.model';
import { TourFeedback } from './tour-feedback.model';
import { TourMember } from './tour-member.model';
import { TourReviewer } from './tour-reviewer.model';
import { ConstTourStatus } from '../constants';

export class Tour {
    public _id: string;
    public tourName: string;
    public locationIds: string[];
    public registerCost: number;
    public description: string;
    public tourGuideId: string;
    public contactNumber: string;
    public creationTime: Date;
    public beginTime: Date;
    public endTime: Date;
    public closeFeedbackTime: Date;
    public closeRegisterTime: Date;
    public durationTime: number;
    public memberLimit: number;
    public status: string;
    // PENDING, REGISTERING, PREPARING, RUNNING, FINISHED
    public isActive: Boolean;
    public schedules: TourSchedule[];
    public preparations: TourPreparation[];
    public feedbacks: TourFeedback[];
    public members: TourMember[];
    public reviewers: TourReviewer[];
    public cover: string;
    public createdBy: string;

    constructor() {
        const constTour = new ConstTourStatus();

        this.tourName = '';
        this.locationIds = [];
        this.registerCost = 0;
        this.description = '';
        this.cover = '';
        this.contactNumber = '';
        this.tourGuideId = '';
        this.memberLimit = 0;
        this.isActive = true;
        this.status = constTour.PENDING;
        this.schedules = [];
        this.preparations = [];
        this.feedbacks = [];
        this.members = [];
        this.reviewers = [];
        this.createdBy = '';
    }
}
