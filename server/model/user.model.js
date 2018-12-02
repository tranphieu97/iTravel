exports = module.exports = {};

exports.User = class User {

    /**
     * User Model
     * @param {string} username 
     * @param {string} password 
     * @param {string} email 
     * @param {string} firstName 
     * @param {string} lastName 
     * @param {Date} birthDay 
     * @param {string} level 
     * @param {string} hometown 
     * @param {number} point 
     * @param {string} permission 
     * @param {string} status 
     * @param {string} avatar 
     * @param {boolean} isLogin 
     * @param {Date} creationDatetime 
     */
    constructor(username, password, email, firstName, lastName,
        birthDay, level, hometown, point, permission, status, avatar, isLogin) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDay = birthDay;
        this.level = level;
        this.hometown = hometown;
        this.point = point;
        this.permission = permission;
        this.status = status;
        this.avatar = avatar;
        this.isLogin = isLogin;
        this.creationDatetime = new Date();
    }
}
