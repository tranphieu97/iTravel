import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ServerService } from 'src/app/core/services/server.service';
import { UserService } from 'src/app/core/services/user.service';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-tour-registering',
  templateUrl: './tour-registering.component.html',
  styleUrls: ['./tour-registering.component.scss']
})
export class TourRegisteringComponent implements OnInit {

  public tourId: string;
  public userId: string;

  constructor(private route: ActivatedRoute, private router: Router, private server: ServerService, public language: LanguageService,
    private userService: UserService) { }

  compLanguage;
  commonLanguage;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.tourId = params['id'];
      if (this.tourId.length !== 24) {
        this.router.navigate(['/not-found']);
      } else {
        this.compLanguage = this.language.currentLanguage.compTourRegistering;
        this.commonLanguage = this.language.currentLanguage.common;
        this.language.hasChangeLanguage.subscribe(() => {
          this.compLanguage = this.language.currentLanguage.compTourRegistering;
          this.commonLanguage = this.language.currentLanguage.common;
        });
      }
    });

    this.userId = this.userService.getUserId();
  }

}
