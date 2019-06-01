import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tour } from 'src/app/model/tour.model';
import { LanguageService } from 'src/app/core/services/language.service';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit {
  @Input() tourData: Tour;
  compLanguage;
  allowSeeFeedback = ['/manager/tours'];
  currentPath: string;

  constructor(
    public activeModal: NgbActiveModal,
    private languageService: LanguageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentPath = this.router.url;
    this.allowSeeFeedback.includes(this.currentPath);
    this.compLanguage = this.languageService.currentLanguage.compTourManagement;
    this.languageService.hasChangeLanguage.subscribe(
      () =>
        (this.compLanguage = this.languageService.currentLanguage.compTourManagement)
    );
  }
}
