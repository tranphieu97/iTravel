import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/core/services/server.service';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  public isUploading: Boolean = false;

  public userInforModel: any;
  private userId: string;

  constructor(private server: ServerService, private userService: UserService) { }

  ngOnInit() {
    this.userId = this.userService.getUserId();
    this.getUserInfo();
  }

  getUserInfo() {
    if (this.userId !== '') {
      this.isUploading = true;
      this.server.getUserInfomation(this.userId).subscribe(res => {
        if (res.statusCode === 200) {
          this.userInforModel = Object.assign(res.data);
        } else {

        }
        this.isUploading = false;
      });
    }
  }

  onPickedAvatar(event: any) {
    const file = (event.target as HTMLInputElement).files[0];

    if (this.userId !== '') {
      this.isUploading = true;
      this.server.uploadImage([{imgFile: file, contentId: 'avatar'}]).subscribe(uploadRes => {
        if (uploadRes.imageUrls && uploadRes.imageUrls[0]) {
          this.server.updateAvatar(this.userId, uploadRes.imageUrls[0]).subscribe(updateRes => {
            if (updateRes.statusCode === 201) {
              this.getUserInfo();
            } else {

            }
            this.isUploading = false;
          });
        }
      });
    }
  }

}
