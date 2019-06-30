import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/core/services/server.service';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { ProvinceCity } from 'src/app/model/province-city.model';
import { ProvinceCityService } from 'src/app/core/services/province-city.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DateStructService } from 'src/app/core/services/date-struct.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  public isUploading: Boolean = false;
  public isLoading: Boolean = false;
  public isSuccess: Boolean = false;
  public isFail: Boolean = false;

  public arrProvince: Array<ProvinceCity>;

  public userInforModel: any;
  private userId: string;
  public birthday: NgbDate;

  compLanguage;
  commonLanguage;

  constructor(private server: ServerService, private userService: UserService, public language: LanguageService,
    private provinceService: ProvinceCityService, private dateStructService: DateStructService, private router: Router) { }

  ngOnInit() {
    this.compLanguage = this.language.currentLanguage.compUpdateProfile;
    this.commonLanguage = this.language.currentLanguage.common;
    this.language.hasChangeLanguage.subscribe(() => {
      this.compLanguage = this.language.currentLanguage.compUpdateProfile;
      this.commonLanguage = this.language.currentLanguage.common;
    });

    this.userService.hasChangeUser.subscribe(() => {
      this.router.navigate(['/home']);
    });

    this.userId = this.userService.getUserId();
    this.getUserInfo();

    if (this.provinceService.allProvinceCity.length === 0) {
      this.provinceService.getAllProvinceCity().subscribe((res) => {
        this.provinceService.allProvinceCity = res.data;
        this.arrProvince = res.data;
      });
    } else {
      this.arrProvince = this.provinceService.allProvinceCity;
    }
  }

  getUserInfo() {
    if (this.userId !== '') {
      this.isUploading = true;
      this.server.getUserInfomation(this.userId).subscribe(res => {
        if (res.statusCode === 200) {
          this.userInforModel = Object.assign(res.data);
          this.birthday = this.dateStructService.getDateStructFromDate(new Date(this.userInforModel.birthDay));
        }
        this.isUploading = false;
      });
    }
  }

  onPickedAvatar(event: any) {
    const file = (event.target as HTMLInputElement).files[0];

    if (this.userId !== '') {
      this.isUploading = true;
      this.server.uploadImage([{ imgFile: file, contentId: 'avatar' }]).subscribe(uploadRes => {
        if (uploadRes.imageUrls && uploadRes.imageUrls[0]) {
          this.server.updateAvatar(this.userId, uploadRes.imageUrls[0]).subscribe(updateRes => {
            if (updateRes.statusCode === 201) {
              this.getUserInfo();
              this.isSuccess = true;
              this.userService.hasChangeUserInfo.next();

              setTimeout(() => {
                this.isSuccess = false;
              }, 5000);
            } else {
              this.isFail = true;

              setTimeout(() => {
                this.isFail = false;
              }, 5000);
            }
            this.isUploading = false;
          });
        }
      });
    }
  }

  onChangeBirthday() {
    this.userInforModel.birthDay = this.dateStructService.getDateFromDateStruct(this.birthday);
  }

  updateProfile() {
    if (this.userInforModel.firstName !== '' && this.userId !== '') {
      this.isLoading = true;

      this.server.updateProfile(this.userId, this.userInforModel).subscribe(res => {
        if (res.statusCode === 201) {
          this.isSuccess = true;
          this.userService.hasChangeUserInfo.next();

          setTimeout(() => {
            this.isSuccess = false;
          }, 5000);
        } else {
          this.isFail = true;

          setTimeout(() => {
            this.isFail = false;
          }, 5000);
        }
        this.isLoading = false;
      });
    }
  }
}
