var model = require('nodejs-model');

module.exports.User = model('User').attr('username', {
    validations: {
        presence: true,
        length: {
            minimum: 6,
            maximum: 30
        }
    }
}).attr('password', {
    validations: {
        presence:true,
        length: {
            minimum: 8
        }
    },
    tags: ['private']
}).attr('email', {
    format: {
        with: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        allowBlank: true
    }
}).attr('firstName', {
    validations: {
        presence: true
    }
}).attr('lastName', {

}).attr('birthDay', {

}).attr('level', {

}).attr('hometown', {
    
}).attr('point', {
    
}).attr('permission', {
    
}).attr('status', {
    
}).attr('avatar', {
    
}).attr('isLogin', {
    
})

