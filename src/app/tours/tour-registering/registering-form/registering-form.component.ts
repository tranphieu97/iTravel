import { Component, OnInit, Input } from '@angular/core';
import { ServerService } from 'src/app/core/services/server.service';
import { UserService } from 'src/app/core/services/user.service';
import { LanguageService } from 'src/app/core/services/language.service';

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

  public amountRegisterPeople: Number = 1;
  public registerNote: String = '';

  public isLoading: Boolean = true;

  compLanguage;
  commonLanguage;

  constructor(private server: ServerService, private userService: UserService, private language: LanguageService) { }

  ngOnInit() {
    this.compLanguage = this.language.currentLanguage.compTourRegistering;
    this.commonLanguage = this.language.currentLanguage.common;
    this.language.hasChangeLanguage.subscribe(() => {
      this.compLanguage = this.language.currentLanguage.compTourRegistering;
      this.commonLanguage = this.language.currentLanguage.common;
    });

    this.userId = this.userService.getUserId();

    this.getRegisteredInfo();
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
}
