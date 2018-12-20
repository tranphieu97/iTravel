export class User {
    public _id: string;
    public username: string;
    public firstName: string;
    public email: string;
    public lastName: string;
    public fullName: string;
    public avatar: string;
    public birthDay: string;
    public level: string;
    public hometown: string;
    public point: number;
    public isAdmin: boolean;
    public permission: string;

    constructor() {
        this._id = null;
        this.username = null;
        this.firstName = null;
        this.lastName = null;
        this.fullName = null;
        this.avatar = null;
        this.birthDay = null;
        this.level = null;
        this.hometown = null;
        this.point = 0;
        this.isAdmin = false;
        this.permission = null;
        this.email = null;
    }

    /**
     * Set full info to a user like a constructor
     * @name setUserFullInfo
     * @author phieu-th
     * @param _id
     * @param username
     * @param firstName
     * @param lastName
     * @param avatar
     * @param birthDay
     * @param level
     * @param hometown
     * @param point
     * @param permission
     */
    setFullUserInfo(_id: string, username: string, email: string, firstName: string, lastName: string, avatar: string,
        birthDay: string, level: string, hometown: string, point: number, permission: string) {
        this._id = _id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        if (lastName) {
            this.fullName = firstName + lastName;
        } else {
            this.fullName = firstName;
        }
        if (avatar !== '') {
            this.avatar = avatar;
        } else {
            this.avatar = 'assets/img/icons8-male-user-96.png';
        }
        this.birthDay = birthDay;
        this.level = level;
        this.hometown = hometown;
        this.point = point;
        this.permission = permission;
        if (permission === 'Admin') {
            this.isAdmin = true;
        } else {
            this.isAdmin = false;
        }
    }

    /**
     * Set required info for user
     * @name setUserRequiredInfo
     * @author phieu-th
     * @param _id
     * @param username
     * @param firstName
     * @param lastName
     * @param avatar
     */
    setUserRequiredInfo(_id: string, username: string, firstName: string, lastName: string, avatar: string) {
        this._id = _id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        if (lastName) {
            this.fullName = firstName + lastName;
        } else {
            this.fullName = firstName;
        }
        if (avatar !== '') {
            this.avatar = avatar;
        } else {
            this.avatar = 'assets/img/icons8-male-user-96.png';
        }
    }
}
