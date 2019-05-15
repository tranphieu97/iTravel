import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tour } from 'src/app/model/tour.model';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit {
  @Input() tourData: Tour;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
