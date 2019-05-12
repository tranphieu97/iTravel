const mongoose = require('mongoose');
const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    ENV,
    ENV_LOCAL,
    ENV_CLOUD,
    DB_HOST
} = require('./secret-info/secret')

const localUrl = `mongodb://localhost:27017/${DB_NAME}`;
const cloudUrl = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;
const url = ENV === ENV_CLOUD ? cloudUrl : localUrl;
mongoose.connect(url, {
    useNewUrlParser: true
});

mongoose.connection
    .on('error', (err) => console.log('Mongoose connection error', err.message))
    .on('disconnected', (err) => console.log('Mongoose disconnected'))
    .once('open', () => console.log(`Mongoose connected to MongoDB on ${ENV}`));

process.on('SIGINT', () => mongoose.connection.close(() => process.exit(0)));