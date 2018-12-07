export class User {
    public _id: string;
    public username: string;
    public firstName: string;
    public lastName: string;
    public fullName: string;
    public avatar: string;
    public birthDay: string;
    public level: string;
    public hometown: string;
    public point: number;
    public isAdmin: boolean;
    public permission: string;

    constructor(_id: string, username: string, firstName: string, lastName: string ) {
        this._id = _id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        if (lastName) {
            this.fullName = firstName + lastName;
        } else {
            this.fullName = firstName;
        }
    }
}
