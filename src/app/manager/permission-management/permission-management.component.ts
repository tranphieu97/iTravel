import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/core/services/server.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { ConstantService } from 'src/app/core/services/constant.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-permission-management',
  templateUrl: './permission-management.component.html',
  styleUrls: ['./permission-management.component.scss']
})
export class PermissionManagementComponent implements OnInit {

  listPermission: any = [];

  listUser: any = [];
  listUserDisplay: any = [];
  currentAccount: any;
  searchKeyword: String = '';
  confirmPassword: string;

  isLoading: Boolean = true;
  isWaitingUpdate: Boolean = false;

  hasError: Boolean = false;
  message: String = '';
  selectedBlockReason: string;
  compLanguage;

  constructor(private server: ServerService, public language: LanguageService, private constant: ConstantService,
    private modal: NgbModal, private _user: UserService) { }

  ngOnInit() {
    this.selectedBlockReason = this.constant.BLOCK_ID.MPU_B01;
    // Request list user with their's permisson
    this.server.getAllUserPermission().subscribe((res) => {
      if (res !== undefined && res.data !== undefined) {
        this.listUser = res.data;
        this.listUserDisplay = res.data;
      }

      this.isLoading = false;
      this.confirmPassword = '';
    });

    // Set list system permisson was stored in constant
    Object.values(this.constant.USER_PERMISSON).forEach(permission => {
      this.listPermission.push({
        permissionName: permission,
        isChecked: false
      });
    });

    this.compLanguage = this.language.currentLanguage.compPermissionManagement;
    this.language.hasChangeLanguage.subscribe(() => this.compLanguage = this.language.currentLanguage.compPermissionManagement);
  }

  /**
   * Display account info and control to set for this account
   * @name seeAccountInfomation
   * @author phieu-th
   * @param username string
   */
  seeAccountInfomation(username: string): void {
    this.currentAccount = this.listUser.find(user => user.username === username);

    if (this.currentAccount.avatar === '') {
      this.currentAccount.avatar = 'assets/img/icons8-male-user-96.png';
    }

    if (this.currentAccount.lastName === null) {
      this.currentAccount.lastName = '';
    }

    this.changeListPermissionByAccount(this.currentAccount.permission);
  }

  /**
   * Update listPermission follow each user be selected
   * @name changeListPermissionByAccount
   * @author phieu-th
   * @param accountPermissions ['permission']
   */
  changeListPermissionByAccount(accountPermissions) {
    this.listPermission = [];
    // Set list system permisson was stored in constant
    Object.values(this.constant.USER_PERMISSON).forEach(permission => {
      this.listPermission.push({
        permissionName: permission,
        isChecked: false
      });
    });

    accountPermissions.forEach(accountPermission => {
      this.listPermission.forEach(commonPermission => {
        if (commonPermission.permissionName === accountPermission) {
          commonPermission.isChecked = true;
        }
      });
    });
  }

  /**
   * Change list account being displayed by end user input
   * @name searchUsernameByKeyword
   * @author phieu-th
   * @name searchUsernameByKeywordl
   */
  searchUsernameByKeyword() {
    if (this.searchKeyword.trim() === '') {
      this.listUserDisplay = this.listUser;
    } else {
      this.listUserDisplay = this.listUser.filter(user =>
        user.username.toLocaleLowerCase().includes(this.searchKeyword.toLocaleLowerCase().trim()));
    }
  }

  /**
   * Update current account permission by list permission be checked
   * @name updateCurrrentAccountPermission
   * @author phieu-th
   */
  updateCurrrentAccountPermission() {
    if (this.confirmPassword.trim() !== '') {
      this.isWaitingUpdate = true;
      this.server.updateUserPermission(this.currentAccount._id, this.listPermission, this._user.currentUser._id, this.confirmPassword)
        .subscribe((res) => {
          this.isWaitingUpdate = false;
          this.confirmPassword = '';
          this.getServerMessage(res);
        });

      this.modal.dismissAll();
    }
  }

  /**
   * Opent model by modelId when click a button
   * @name openConfirmDialog
   * @author phieu-th
   * @param contentId
   */
  openConfirmDialog(contentId) {
    // Show modal
    this.modal.open(contentId, { ariaLabelledBy: 'modal-basic-title' });

    // Clear password was inputed
    this.confirmPassword = '';
  }

  /**
   * Get Message Code from request then set to View message
   * @name getServerMessage
   * @author phieu-th
   * @param res Response
   */
  getServerMessage(res) {
    if (res === undefined || res === null) {
      this.hasError = false;
      this.message = '';
    } else {
      switch (res.MessageCode) {
        case 'MUP_M01':
          this.hasError = false;
          this.message = this.compLanguage.permissionMessUpdatedSuccess;
          break;
        case 'MUP_E02':
          this.hasError = true;
          this.message = this.compLanguage.permissionMessUpdatedFail;
          break;
        case 'MUP_E04':
          this.hasError = true;
          this.message = this.compLanguage.permissionMessIncorrectPassword;
          break;
        case 'MUP_E06':
          this.hasError = true;
          this.message = this.compLanguage.permissionMessServerError;
          break;
        default:
          this.hasError = true;
          this.message = this.compLanguage.permissionMessIncorrectData;
          break;
      }
    }
  }

  /**
   * Block current account
   * @name blockCurrentAccount
   * @author phieu-th
   */
  blockCurrentAccount() {
    if (this.confirmPassword.trim() !== '') {
      this.isWaitingUpdate = true;
      this.server.blockUser(this.currentAccount._id, this.selectedBlockReason, this._user.currentUser._id, this.confirmPassword)
        .subscribe((res) => {
          if (res) {
            this.isWaitingUpdate = false;
            this.confirmPassword = '';
            this.getServerMessage(res);
          }
        });
      this.modal.dismissAll();
    }
  }
}
