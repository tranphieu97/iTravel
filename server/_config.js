
const DB_HOST = 'mongodb+srv://itravel_admin:eD4w6NpdUyW5YeN@itravelcluster-x2srr.mongodb.net/';
const DB_NAME = 'iTravel';
const CONNECTION_STRING = DB_HOST + DB_NAME;
const APP_PORT = 7979;

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

module.exports = {
    APP_PORT: APP_PORT,
    DB_HOST: DB_HOST,
    DB_NAME: DB_NAME,
    CONNECTION_STRING: CONNECTION_STRING,
    SECRET_KEY: SECRET_KEY,
    PUBLIC_KEY: PUBLIC_KEY,
    signOptions: signOptions,
    verifyOptions: verifyOptions
};