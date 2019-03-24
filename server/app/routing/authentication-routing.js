// Include js file
const database = require('../database.js');
const config = require('../../_config.js');
const authentication = require('../authentication.js');
var ObjectId = require('mongodb').ObjectId;

// Include library
const jwt = require('jsonwebtoken');
const User = require('../../model/user.model').User;

// Get app instance from index
const app = require('../../index');

// Routing - START
/**
 * @name API - GET Check an username is exist?
 * @author phieu-th
 * @description 
 * @returns true if user is existed
 */
app.get('/auth/exist-username', async (req, res) => {

    username = req.param('username');

    authentication.isExistUsername(username.trim())
        .then((result) => {
            res.status(200).json({
                message: 'Check exist username is successed',
                data: result
            });
        })
        .catch(() => {
            res.status(500).json({
                message: 'Check exist username is fail',
                data: false
            });
        });
})

/**
 * @name API - POST register a new user count
 * @author phieu-th
 * @description 
 * @returns register result
 */
app.post('/auth/register-user', async (req, res) => {

    // Get POST REQUEST'S BODY DATA
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const confirmPassword = req.body.confirmPassword;
    const acceptPolicies = req.body.acceptPolicies;

    // Validate Data
    if (acceptPolicies && username !== '' && password !== '' && firstName !== '' && password === confirmPassword) {
        authentication.isExistUsername(username)
            .then((isExist) => {
                if (!isExist) {

                    // Hash password and creat user
                    authentication.hashPassword(password).then((hashPassword) => {
                        var registerUser = new User(username, hashPassword, '', firstName, lastName,
                            null, 'Newbie', '', 0, 'Member', 'Active', '', false);

                        database.insertOneToColection(database.iTravelDB.Users, registerUser)
                            .then(() => {
                                // Check creation result
                                authentication.isExistUsername(username)
                                    .then((isExist) => {
                                        if (isExist) {
                                            res.status(201).json({
                                                message: 'Register is success',
                                                data: true
                                            });
                                        } else {
                                            res.status(500).json({
                                                message: 'Register User is fail',
                                                data: false
                                            });
                                        }
                                    })
                            });
                    }).catch((err) => {
                        console.log(err);
                    });
                } else {
                    res.status(200).json({
                        message: 'Register new User Fail, Username is Exist',
                        data: false
                    });
                }
            });
    } else {
        res.status(400).json({
            message: 'Register new User Fail, Data invalid',
            data: false
        });
    }
});

/**
 * @name API - POST Login
 * @author phieu-th
 * @description 
 * @returns User's information and login-token
 */
app.post('/auth/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Regex for check username's format and password's format
    const usernameRegex = new RegExp('^(?=.*[a-z])[a-z0-9._@-]{1,30}$');
    const passwordRegex = new RegExp('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{1,30}$');

    if (username === '' || username.length < 6 || username.length > 30
        || password === '' || password.length < 8
        || !usernameRegex.test(username) || !passwordRegex.test(password)) {
        res.status(400).json({
            message: 'Invalid Account',
            data: false
        });
    } else {
        const filterUser = {
            username: {
                $eq: username
            }
        }

        database.getOneFromCollection(database.iTravelDB.Users, filterUser)
            .then((userInfo) => {
                if (userInfo === null || userInfo === undefined) {
                    res.status(200).json({
                        message: 'Invalid Username',
                        data: false
                    });
                } else {
                    authentication.comparePassword(password, userInfo.password).then((isMatch) => {
                        if (!isMatch) {
                            res.status(200).json({
                                message: 'Incorrect password',
                                data: false
                            });
                        } else {
                            let isAdmin = false;

                            if (userInfo.permission === 'Admin') {
                                isAdmin = true;
                            }

                            const userData = {
                                _id: userInfo._id,
                                username: userInfo.username,
                                isAdmin: isAdmin
                            }

                            const data = {
                                _id: userInfo._id,
                                username: userInfo.username,
                                firstName: userInfo.firstName,
                                lastName: userInfo.lastName,
                                avatar: userInfo.avatar,
                                isAdmin: isAdmin
                            }

                            authentication.insertUserSignInLog(userInfo.username);

                            jwt.sign(userData, config.SECRET_KEY, { expiresIn: '23h' }, (err, jwtToken) => {
                                res.status(201).json({
                                    message: 'Login success!',
                                    token: jwtToken,
                                    data: data
                                });
                            });
                        }
                    });
                }
            });
    }
});
// Routing - END