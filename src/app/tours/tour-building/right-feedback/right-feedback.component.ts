import { Component, OnInit, Input } from '@angular/core';
import { ServerService } from 'src/app/core/services/server.service';

@Component({
  selector: 'app-right-feedback',
  templateUrl: './right-feedback.component.html',
  styleUrls: ['./right-feedback.component.scss']
})
export class RightFeedbackComponent implements OnInit {
  @Input() tourId: string;
  feedbacks = [];

  constructor(private serverService: ServerService) {}

  ngOnInit() {
    this.serverService.getTourFeedbacks(this.tourId).subscribe(res => {
      if (res.data) {
        this.feedbacks = res.data;
      }
    });
  }

  refetchTourFeedbacks = () => {
    this.serverService.getTourFeedbacks(this.tourId).subscribe(res => {
      if (res.data) {
        this.feedbacks = res.data;
      }
    });
  }
}
