import { Component, OnInit, Input } from '@angular/core';
import { ServerService } from 'src/app/core/services/server.service';
import { UserService } from 'src/app/core/services/user.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { TourMember } from 'src/app/model/tour-member.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registering-form',
  templateUrl: './registering-form.component.html',
  styleUrls: ['./registering-form.component.scss']
})
export class RegisteringFormComponent implements OnInit {

  @Input() tourId: string;
  public userId: string;

  public isRegistered: Boolean = false;
  public registeredData: any;

  public isShowFormRegister: Boolean = false;
  public arrRegisterForOption: Array<number> = [];

  public amountRegisterPeople: number;
  public registerNote: string;
  public contact: string;

  public isLoading: Boolean = true;
  public isErrorOverLimit: Boolean = false;
  public isErrorServer: Boolean = false;

  compLanguage;
  commonLanguage;

  constructor(private server: ServerService, private userService: UserService, private language: LanguageService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.compLanguage = this.language.currentLanguage.compTourRegistering;
    this.commonLanguage = this.language.currentLanguage.common;
    this.language.hasChangeLanguage.subscribe(() => {
      this.compLanguage = this.language.currentLanguage.compTourRegistering;
      this.commonLanguage = this.language.currentLanguage.common;
    });

    this.userId = this.userService.getUserId();
    this.getRegisteredInfo();

    this.userService.hasChangeUser.subscribe(() => {
      this.userId = this.userService.getUserId();
      this.getRegisteredInfo();
      this.modalService.dismissAll();
    });

    this.userService.isLoginChange.subscribe(() => {
      this.userId = this.userService.getUserId();
      this.getRegisteredInfo();
      this.modalService.dismissAll();
    });
  }

  getRegisteredInfo() {
    this.isLoading = true;
    this.server.getTourRegisteredInfo(this.tourId, this.userId).subscribe(res => {
      if (res.statusCode === 200) {
        this.registeredData = res.data;
        this.createRegisterForOption();
        this.isLoading = false;
      }
    });

    this.contact = '';
    this.amountRegisterPeople = 1;
    this.registerNote = '';
  }

  createRegisterForOption() {
    this.arrRegisterForOption = [];
    try {
      if (this.registeredData.currentMember < this.registeredData.memberLimit) {
        let couter = 1;
        for (let index = this.registeredData.currentMember; index < this.registeredData.memberLimit; index++) {
          this.arrRegisterForOption.push(couter);
          couter++;
        }
      }
    } catch {
      this.arrRegisterForOption = [];
    }
  }

  registerTour() {
    if (this.amountRegisterPeople === 1 || (this.amountRegisterPeople > 1 && this.registerNote)) {
      this.isLoading = true;
      this.isErrorOverLimit = false;
      this.isErrorServer = false;

      const registerObj: TourMember = new TourMember(this.userId, this.registeredData.registerCost, this.contact);
      registerObj.registerFor = this.amountRegisterPeople;
      registerObj.registerNote = this.registerNote;

      this.server.registerTour(this.tourId, registerObj).subscribe(res => {
        this.isLoading = false;
        if (res.result.success) {
          this.isShowFormRegister = false;
        } else if (res.result.overLimit) {
          this.isErrorOverLimit = true;
        } else {
          this.isErrorServer = true;
          this.isShowFormRegister = false;
        }
        this.getRegisteredInfo();

        setTimeout(() => {
          this.isErrorOverLimit = false;
          this.isErrorServer = false;
        }, 10000);
      });
    }
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
