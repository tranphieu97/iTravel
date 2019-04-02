
const DB_HOST = 'mongodb+srv://itravel_admin:eD4w6NpdUyW5YeN@itravelcluster-x2srr.mongodb.net/';
const DB_NAME = 'iTravel';
const CONNECTION_STRING = DB_HOST + DB_NAME;

const normalizePort = val => {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
};
const APP_PORT = normalizePort(process.env.PORT || "7979");

const SECRET_KEY = 'MIIBOwIBAAJBAJUod/qooZzPZ15v+jIfemAyV1b3faqRQUUgsmqpvLna99bcatqze+y/Qu2qGODk86qsV169hsoPG9DfbJsa5SMCAwEAAQJADY/zcNg6ca6uIHkgD8Sq9Oo+5Mp2I7c3bxitAGPUpDVvHKkrwPXThcN/fQKkb2IBV/EAflDTnmBJ5GWGj5sZAQIhAPuPt0GYqy2SDAxxW4Jzt3vDM80IZdKlCWNHrcKFyk6jAiEAl8o0ZOyPRDC6HlzwvkrgXdRhtbalSu0ilB6BfH8u94ECIQC/hSgI6dmRJTrFElyQEddkgzXh6H3VBE8EZeL1UPS4LwIhAIDrHmDxgiTaddk/+sDEe5d1wJ9DR1RB3/KJjlSc+NkBAiB0Y6mBUH++aamg+A8tx76PJAhrsuR236RJW/CkZ9xOrw==';
const PUBLIC_KEY = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJUod/qooZzPZ15v+jIfemAyV1b3faqRQUUgsmqpvLna99bcatqze+y/Qu2qGODk86qsV169hsoPG9DfbJsa5SMCAwEAAQ==';

const signOptions = {
    expiresIn: "12h",
    algorithm: "RS256"
}

const verifyOptions = {
    expiresIn: "12h",
    algorithm: ["RS256"]
}

// some extention of image that allow to save on server
const MINE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg'
};

const USER_PERMISSION = {
    MEMBER: 'Member',
    ADMIN: 'Admin'
};

const POST_STATUS =
{
    NEW: 'NEW',
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    DENY: 'DENY',
    NEED_REPAIR: 'NEED_REPAIR'
};

const REGION_NAME = {
    NORTH: 'miền bắc',
    CENTRAL: 'miền trung',
    SOUTH: 'miền nam'
}

module.exports = {
    APP_PORT: APP_PORT,
    DB_HOST: DB_HOST,
    DB_NAME: DB_NAME,
    CONNECTION_STRING: CONNECTION_STRING,
    SECRET_KEY: SECRET_KEY,
    PUBLIC_KEY: PUBLIC_KEY,
    signOptions: signOptions,
    verifyOptions: verifyOptions,
    MINE_TYPE_MAP: MINE_TYPE_MAP,
    USER_PERMISSION: USER_PERMISSION,
    POST_STATUS: POST_STATUS,
    REGION_NAME: REGION_NAME
};