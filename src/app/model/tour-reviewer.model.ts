import { ConstTourReviewer } from '../constants';

export class TourReviewer {
    public _id: string;
    public reviewerId: string;
    public state: string;
    // APPROVED, DENIED, REQUESTED CHANGE, PENDING
    public feedback: string;

    constructor(reviewerId: string) {
        const constTourReviewer = new ConstTourReviewer();
        this.reviewerId = reviewerId;
        this.state = constTourReviewer.PENDING;
        this.feedback = '';
    }
}
