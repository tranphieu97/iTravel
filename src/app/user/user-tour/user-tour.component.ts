import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { ServerService } from 'src/app/core/services/server.service';
import { Tour } from 'src/app/model/tour.model';
import { ConstTourStatus } from 'src/app/constants';
import { LanguageService } from 'src/app/core/services/language.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-tour',
  templateUrl: './user-tour.component.html',
  styleUrls: ['./user-tour.component.scss']
})
export class UserTourComponent implements OnInit {
  tours: Tour[];
  tourStatus: ConstTourStatus = new ConstTourStatus();
  // tourGuides = [];
  compLanguage;

  constructor(
    private languageService: LanguageService,
    private userService: UserService,
    private serverService: ServerService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.compLanguage = this.languageService.currentLanguage.compTourManagement;
    this.languageService.hasChangeLanguage.subscribe(
      () =>
        (this.compLanguage = this.languageService.currentLanguage.compTourManagement)
    );
    this.serverService.getUserTours(true).subscribe(res => {
      if (res.data) {
        this.tours = res.data;
      }
    });
  }
}
