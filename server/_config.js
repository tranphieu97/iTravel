const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_HOST,
    SECRET_KEY,
    PUBLIC_KEY
} = require('./secret-info/secret')
const db_host = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/`;
const db_name = DB_NAME;
const CONNECTION_STRING = db_host + db_name;

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

// const SECRET_KEY moved to ignore file
// const PUBLIC_KEY moved to ignore file

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
    ADMIN: 'Admin',
    TOURGUIDE: 'Tour Guide'
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
};

const USER_STATUS = {
    ACTIVE: 'Active',
    BLOCK: 'Block'
};

const PERMISSION_MANAGEMENT_ACTION = {
    UPDATE_PERMISSION: 'Update Permission',
    BLOCK: 'Block',
    UNBLOCK: 'UnBlock'
};

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
    REGION_NAME: REGION_NAME,
    USER_STATUS: USER_STATUS,
    PERMISSION_MANAGEMENT_ACTION: PERMISSION_MANAGEMENT_ACTION
};