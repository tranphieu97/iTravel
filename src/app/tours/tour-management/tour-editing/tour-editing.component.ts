import { Component, OnInit, Input } from '@angular/core';
import { Tour } from 'src/app/model/tour.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from 'src/app/core/services/language.service';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/core/services/server.service';

@Component({
  selector: 'app-tour-editing',
  templateUrl: './tour-editing.component.html',
  styleUrls: ['./tour-editing.component.scss']
})
export class TourEditingComponent implements OnInit {

  @Input() tourData: Tour;

  public isLoading: Boolean = true;

  compLanguage;
  commonLanguage;

  constructor(public activeModal: NgbActiveModal, private language: LanguageService, private router: Router) {}

  ngOnInit() {
    this.compLanguage = this.language.currentLanguage.compTourEditing;
    this.commonLanguage = this.language.currentLanguage.common;
    this.language.hasChangeLanguage.subscribe(() => {
      this.compLanguage = this.language.currentLanguage.compTourEditing;
      this.commonLanguage = this.language.currentLanguage.common;
    });

    console.log(this.tourData);
  }
}
