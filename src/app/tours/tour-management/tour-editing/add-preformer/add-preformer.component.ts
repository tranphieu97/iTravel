import { Component, OnInit, Input } from '@angular/core';
import { LanguageService } from 'src/app/core/services/language.service';
import { EditTourService } from 'src/app/core/services/edit-tour.service';
import { AddTourService } from 'src/app/core/services/add-tour.service';
import { ServerService } from 'src/app/core/services/server.service';
import { TourMember } from 'src/app/model/tour-member.model';

@Component({
  selector: 'app-add-preformer',
  templateUrl: './add-preformer.component.html',
  styleUrls: ['./add-preformer.component.scss']
})
export class AddPreformerComponent implements OnInit {

  @Input() tourMembers: TourMember;

  public arrPerformers: Array<any> = [];
  public arrTourguides: Array<any> = [];
  public arrMembers: Array<any> = [];
  constructor(public language: LanguageService, private editTourService: EditTourService, private server: ServerService) { }

  compLanguage;
  commonLanguage;
  ngOnInit() {
    this.compLanguage = this.language.currentLanguage.compTourEditing;
    this.commonLanguage = this.language.currentLanguage.common;
    this.language.hasChangeLanguage.subscribe(() => {
      this.compLanguage = this.language.currentLanguage.compTourEditing;
      this.commonLanguage = this.language.currentLanguage.common;
    });

    this.arrPerformers = this.editTourService.getArrPerformsInfo();
    this.arrMembers = this.editTourService.getArrMemberInfo();
    this.getArrTourguide();
  }

  private getArrTourguide() {
    this.server.getTourguides().subscribe((res) => {
      this.arrTourguides = res.data.map((item: any) => {
        return {
          _id: item._id,
          displayName: item.lastName === '' ? item.firstName : item.lastName + ' ' + item.firstName,
          username: item.username
        };
      });
      this.arrTourguides.sort((userA, userB) => {
        if (userA.displayName[0] < userB.displayName[0]) {
          return -1;
        } else {
          return 1;
        }
      });
    });
  }

  public addToPerformers(preformer: any) {
    const existIndex = this.arrPerformers.findIndex(x => x._id === preformer._id);
    if (existIndex === -1) {
      this.arrPerformers.push(preformer);

      this.arrPerformers.sort((userA, userB) => {
        if (userA.displayName[0] < userB.displayName[0]) {
          return -1;
        } else {
          return 1;
        }
      });
    }
  }

  public removePerformer(preformer: any) {
    if (this.arrPerformers.includes(preformer) && this.arrPerformers.length > 1) {
      this.arrPerformers.splice(this.arrPerformers.indexOf(preformer), 1);
    }
  }
}
