import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/core/services/server.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { ConstantService } from 'src/app/core/services/constant.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-permission-management',
  templateUrl: './permission-management.component.html',
  styleUrls: ['./permission-management.component.scss']
})
export class PermissionManagementComponent implements OnInit {

  listPermission: any = [];
  listUserPermisson: any = [];
  listUserPermissonDisplay: any = [];
  currentAccount: any;
  searchKeyword: String = '';
  selectedPermission: String = this.constant.USER_PERMISSON.MEMBER;

  isLoading: Boolean = true;

  constructor(private server: ServerService, public language: LanguageService, private constant: ConstantService,
    private modal: NgbModal) { }

  ngOnInit() {
    // Request list user with their's permisson
    this.server.getAllUserPermission().subscribe((res) => {
      if (res !== undefined && res.data !== undefined) {
        this.listUserPermisson = res.data;
        this.listUserPermissonDisplay = res.data;
      }

      this.isLoading = false;
    });

    // Set list system permisson was stored in constant
    this.listPermission = Object.values(this.constant.USER_PERMISSON);
  }

  /**
   * Display account info and control to set for this account
   * @author phieu-th
   * @name seeAccountInfomation
   * @param username string
   */
  seeAccountInfomation (username: string): void {
    this.currentAccount = this.listUserPermisson.find(user => user.username === username);

    if (this.currentAccount.avatar === '') {
      this.currentAccount.avatar = 'assets/img/icons8-male-user-96.png';
    }

    if (this.currentAccount.lastName === null) {
      this.currentAccount.lastName = '';
    }
  }

  /**
   * Change list account being displayed by end user input
   * @author phieu-th
   * @name searchUsernameByKeywordl
   */
  searchUsernameByKeyword() {
    if (this.searchKeyword.trim() === '') {
      this.listUserPermissonDisplay = this.listUserPermisson;
    } else {
      this.listUserPermissonDisplay = this.listUserPermisson.filter(user =>
        user.username.toLocaleLowerCase().includes(this.searchKeyword.toLocaleLowerCase().trim()));
    }
  }

  openConfirmDialog(contentId, actionName) {
    this.modal.open(contentId, { ariaLabelledBy: 'modal-basic-title' }).result.then(() => {
    }).catch((err) => {
      console.log(err);
    });
  }
}
